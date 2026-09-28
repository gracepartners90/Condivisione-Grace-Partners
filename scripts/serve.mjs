/**
 * Static server for Railway: the preview, and production if the site is hosted there.
 * Serves the Astro build with the rules the site already declares for any host:
 * - dist/_headers (cache and security headers) and dist/_redirects (301s);
 * - trailing slashes (trailingSlash: 'always'), directory index, 404.html with status 404;
 * - brotli or gzip for text, compressed once at start-up; ETag and 304.
 * Preview safety: `X-Robots-Tag: noindex` unless INDEXING=on; optional Basic auth with
 * PREVIEW_AUTH=user:password. /healthz answers without auth for the platform health check.
 * No dependencies. Usage: `npm start` (PORT from the environment, DIST_DIR to serve another build).
 */
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import { createHash, timingSafeEqual } from 'node:crypto';

const root = process.env.DIST_DIR ?? fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT) || 8080;
const indexing = process.env.INDEXING === 'on';
const auth = process.env.PREVIEW_AUTH ? Buffer.from(`Basic ${Buffer.from(process.env.PREVIEW_AUTH).toString('base64')}`) : null;

if (!existsSync(join(root, 'index.html'))) {
  console.error(`serve: no build in ${root}. Run \`npm run build\` first.`);
  process.exit(1);
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.vtt': 'text/vtt; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};
const compressible = new Set(['.html', '.css', '.js', '.mjs', '.json', '.webmanifest', '.xml', '.txt', '.vtt', '.svg']);

// Every file of the build, in memory: the site weighs a few MB.
const files = new Map();
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    const url = `/${relative(root, path).split(sep).join('/')}`;
    if (url === '/_headers' || url === '/_redirects') continue;
    const body = readFileSync(path);
    const ext = extname(name).toLowerCase();
    const file = {
      body,
      type: types[ext] ?? 'application/octet-stream',
      etag: `"${createHash('sha1').update(body).digest('base64url').slice(0, 16)}"`,
    };
    if (compressible.has(ext) && body.length > 512) {
      file.br = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: body.length } });
      file.gzip = gzipSync(body, { level: 9 });
    }
    files.set(url, file);
  }
})(root);

// Netlify/Cloudflare-style rules, so every host applies the same configuration.
const toPattern = (path) => new RegExp(`^${path.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
const readRules = (name) => {
  const path = join(root, name);
  return existsSync(path) ? readFileSync(path, 'utf8').split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')) : [];
};
const headerRules = [];
for (const line of readRules('_headers')) {
  if (!/^\s/.test(line)) headerRules.push({ pattern: toPattern(line.trim()), headers: [] });
  else if (headerRules.length) {
    const i = line.indexOf(':');
    if (i > 0) headerRules.at(-1).headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
  }
}
const redirects = new Map(
  readRules('_redirects').map((line) => {
    const [from, to, status] = line.trim().split(/\s+/);
    return [from, { to, status: Number(status) || 301 }];
  }),
);

const ruleHeaders = (pathname) => {
  const out = {};
  for (const rule of headerRules) if (rule.pattern.test(pathname)) for (const [k, v] of rule.headers) out[k] = v;
  return out;
};

const encodingFor = (req, file) => {
  const accept = String(req.headers['accept-encoding'] ?? '');
  if (file.br && /\bbr\b/.test(accept)) return ['br', file.br];
  if (file.gzip && /\bgzip\b/.test(accept)) return ['gzip', file.gzip];
  return [null, file.body];
};

const send = (req, res, status, file, pathname) => {
  const headers = { 'Content-Type': file.type, ETag: file.etag, ...ruleHeaders(pathname) };
  // HTML, sitemap and robots.txt keep no rule: revalidate every time with the ETag.
  headers['Cache-Control'] ??= 'public, max-age=0, must-revalidate';
  if (!indexing) headers['X-Robots-Tag'] = 'noindex, nofollow';
  if (file.br) headers.Vary = 'Accept-Encoding';
  if (status === 200 && req.headers['if-none-match'] === file.etag) {
    res.writeHead(304, headers);
    return res.end();
  }
  const [encoding, body] = encodingFor(req, file);
  if (encoding) headers['Content-Encoding'] = encoding;
  headers['Content-Length'] = body.length;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : body);
};

const redirect = (res, location, status = 301) => {
  res.writeHead(status, { Location: location, 'Cache-Control': 'public, max-age=3600' });
  res.end();
};

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  const url = new URL(req.url ?? '/', 'http://localhost');
  if (url.pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end('ok');
  }
  if (auth) {
    const given = Buffer.from(String(req.headers.authorization ?? ''));
    if (given.length !== auth.length || !timingSafeEqual(given, auth)) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Anteprima ITnode", charset="UTF-8"', 'Cache-Control': 'no-store' });
      return res.end('Accesso riservato.');
    }
  }
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    return res.end();
  }

  const rule = redirects.get(pathname);
  if (rule) return redirect(res, rule.to + url.search, rule.status);

  if (files.has(pathname)) return send(req, res, 200, files.get(pathname), pathname);
  if (pathname.endsWith('/') && files.has(`${pathname}index.html`)) return send(req, res, 200, files.get(`${pathname}index.html`), pathname);
  if (!pathname.endsWith('/') && files.has(`${pathname}/index.html`)) return redirect(res, `${url.pathname}/${url.search}`);

  const notFound = files.get('/404.html');
  if (notFound) return send(req, res, 404, notFound, pathname);
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Pagina non trovata.');
});

server.listen(port, () => {
  console.log(`serve: ${files.size} files from ${root} on port ${port}${indexing ? '' : ' (noindex)'}${auth ? ' (auth)' : ''}`);
});

// Railway stops containers with SIGTERM: finish the open requests, then exit.
process.on('SIGTERM', () => server.close(() => process.exit(0)));
