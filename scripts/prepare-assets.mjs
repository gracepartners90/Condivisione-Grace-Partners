// Derives art-directed images from the client's original assets
// (docs/creativa/direzione-visiva.md §4.2–4.3). Originals stay untouched in
// src/assets/images/; outputs go to src/assets/images/derivate/.
// Run with: npm run assets
import sharp from 'sharp';
import { mkdir, rm } from 'node:fs/promises';

const SRC = 'src/assets/images';
const OUT = `${SRC}/derivate`;

/**
 * Event photo crops, in pixels on their original. Colour untouched.
 * - Home: the clean version sent by the user on 2026-10-07 (1672×941, no frame, logo or tagline),
 *   with both screens and the backdrop mark whole (creative-director, verdict of 2026-10-07).
 * - The other crops: the 1365×768 social-media version, inside its overlay (white frame, logo
 *   top-left, tagline and ✦ symbol bottom-right).
 */
const eventCrops = [
  { src: 'evento-puglia-digitale-pulita.webp', out: 'evento-panorama.jpg', box: { left: 0, top: 40, width: 1672, height: 736 } }, // 2.27:1, 21 px above the highest screen corner
  { src: 'evento-puglia-digitale-pulita.webp', out: 'evento-citta.jpg', box: { left: 24, top: 100, width: 549, height: 686 } }, // 4:5, aerial city screen with 24 px above it, stopping before the lectern
  { src: 'evento-puglia-digitale.jpg', out: 'evento-palco.jpg', box: { left: 470, top: 124, width: 448, height: 560 } }, // 4:5, stage
  { src: 'evento-puglia-digitale.jpg', out: 'evento-schermo.jpg', box: { left: 880, top: 124, width: 438, height: 548 } }, // 4:5, 360° square screen
];

/**
 * Place photos for the doors of /puglia-digitale/ (visual direction §4.7, ADR 007), in pixels on the
 * original. The client's portal images, with their digital overlays kept by the user's choice; the
 * 3:5 crops leave out the large panels where a clean cut exists. Colour untouched, no resize.
 */
const placeCrops = [
  { src: 'acquaviva-digitale.webp', out: 'acquaviva-porta.jpg', box: { left: 388, top: 36, width: 462, height: 770 } }, // 3:5
  { src: 'gravina-digitale.webp', out: 'gravina-porta.jpg', box: { left: 444, top: 30, width: 580, height: 967 } }, // 3:5, clean cut
  { src: 'monopoli-digitale.webp', out: 'monopoli-porta.jpg', box: { left: 154, top: 0, width: 614, height: 1023 } }, // 3:5, least-bad cut (§4.7)
];

/**
 * SIII screenshots: crops of a phone view (visual direction §4.8), in pixels on the original. Colour untouched,
 * no resize. Names follow siii-<business>-desktop|mobile-<view>, which the A7 launch check reads.
 * - YES, for the /siii/ hero from 64em: 3:5 like the door. It stops above the clipped «APRI QUI» label and the
 *   privacy widget cut by the screen edge, and leaves out the menu, the only way to keep the logo and the
 *   contacts whole. Phones keep their 4:5 crop of the original (Media mobileCrop.image).
 * - La Tana di Aldo, for chapter 01 of the Home on portrait phones: 4:5 from the smartphone view, at full
 *   resolution. It leaves out the air conditioner on the left edge and most of the vault, and keeps the three
 *   contact icons whole (55 px above the bottom edge, 37 px from the left one).
 */
const siiiCrops = [
  { src: 'siii-yes-mobile-negozio.jpg', out: 'siii-yes-desktop-negozio.jpg', box: { left: 0, top: 0, width: 1014, height: 1690 } }, // 3:5
  { src: 'siii-la-tana-di-aldo-mobile-sala.jpg', out: 'siii-la-tana-di-aldo-mobile-sala-4x5.jpg', box: { left: 120, top: 650, width: 1080, height: 1350 } }, // 4:5
];

/**
 * Founder portraits, «inchiostro» treatment (only because the user chose to use these photos):
 * 1. luminance weighted on the blue channel, so the blue skyline fades towards paper;
 * 2. contrast ×1.2 −30 and tone mapping from inchiostro #141413 to calce #F3F1EC, in one linear step.
 */
const portraits = [
  // Centred on the founder (user, 2026-10-07: the Home portrait «non è centrata»). The Città Digitali logo
  // stands just left of him: its last letters, which the centred crop would cut, are taken out first.
  {
    src: 'fondatore-braccia-conserte.jpg',
    out: 'fondatore-ritratto.jpg',
    box: { left: 445, top: 36, width: 480, height: 480 },
    withoutLogo: {
      area: [230, 135, 570, 336],
      // Top of the suit measured either side of the last «I», which was laid over the shoulder.
      suitTop: (x) => (x < 544 ? 336 + 0.29 * (544 - x) : x <= 560 ? 336 - 0.5 * (x - 544) : 328 - 0.475 * (x - 560)),
    },
  },
  { src: 'fondatore-in-piedi.jpg', out: 'fondatore-contatti.jpg', box: { left: 470, top: 40, width: 420, height: 560 } },
];

/**
 * Takes the logo letters out of `area` (source pixels): saturated, not dark pixels, grown by 3 px onto
 * the light background, are filled with a Gaussian-weighted mean of the light background around them.
 * Below `suitTop(x)` the fill comes from the suit instead, with a 1.5 px soft edge. Returns a PNG.
 */
async function withoutLogo(file, { area: [x0, y0, x1, y1], suitTop }) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const at = (x, y) => (y * W + x) * 3;
  const chroma = (i) => Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
  const luma = (i) => 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
  const isLetter = (i) => chroma(i) > 55 && Math.max(data[i], data[i + 1], data[i + 2]) > 90;
  const isSky = (i) => luma(i) > 170 && chroma(i) < 55;
  const isSuit = (i) => luma(i) < 60 && chroma(i) < 40;
  const letter = new Uint8Array(W * H);
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (isLetter(at(x, y))) letter[y * W + x] = 1;
  const mask = letter.slice();
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (letter[y * W + x] || Math.max(...data.subarray(at(x, y), at(x, y) + 3)) < 90) continue;
      near: for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < W && yy < H && letter[yy * W + xx]) {
            mask[y * W + x] = 1;
            break near;
          }
        }
      }
    }
  }
  const R = 18;
  const mean = (x, y, accept) => {
    let r = 0, g = 0, b = 0, sum = 0;
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= W || yy >= H || mask[yy * W + xx] || !accept(at(xx, yy), xx, yy)) continue;
        const w = Math.exp(-(dx * dx + dy * dy) / 162), j = at(xx, yy);
        r += w * data[j];
        g += w * data[j + 1];
        b += w * data[j + 2];
        sum += w;
      }
    }
    return sum > 0 ? [r / sum, g / sum, b / sum] : null;
  };
  const out = Buffer.from(data);
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (!mask[y * W + x]) continue;
      const depth = y - suitTop(x); // > 0: inside the suit
      const sky = mean(x, y, isSky);
      const suit = depth > -1.5 ? mean(x, y, (j, xx, yy) => isSuit(j) && yy > suitTop(xx)) : null;
      const a = suit ? Math.min(1, Math.max(0, (depth + 0.5) / 1.5)) : 0;
      const c = sky && suit ? sky.map((v, k) => v * (1 - a) + suit[k] * a) : (sky ?? suit);
      if (c) out.set(c.map(Math.round), at(x, y));
    }
  }
  return sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer();
}

const INK = [20, 20, 19];
const PAPER = [243, 241, 236];
const k = PAPER.map((p, i) => (p - INK[i]) / 255);
const linearA = k.map((ki) => 1.2 * ki);
const linearB = k.map((ki, i) => -30 * ki + INK[i]);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const { src, out, box } of eventCrops) {
  await sharp(`${SRC}/${src}`).extract(box).jpeg({ quality: 92, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height}`);
}

for (const { src, out, box } of placeCrops) {
  await sharp(`${SRC}/${src}`).extract(box).jpeg({ quality: 90, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height}`);
}

for (const { src, out, box } of siiiCrops) {
  await sharp(`${SRC}/${src}`).extract(box).jpeg({ quality: 92, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height}`);
}

for (const { src, out, box, withoutLogo: clean } of portraits) {
  const lum = [0.15, 0.25, 0.6];
  const input = clean ? await withoutLogo(`${SRC}/${src}`, clean) : `${SRC}/${src}`;
  const grey = await sharp(input)
    .extract(box)
    .removeAlpha()
    .recomb([lum, lum, lum])
    .toBuffer();
  await sharp(grey).linear(linearA, linearB).jpeg({ quality: 90, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height} (inchiostro)`);
}
