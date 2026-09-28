#!/usr/bin/env bash
# Hosting check for G4 condition C08 (docs/performance/budget.md §6.8): headers, compression,
# protocol and cold TTFB, measured from the network the script runs on.
# Run it from Italy twice: on a fixed line and on a mobile connection (phone hotspot, 4G/5G).
# Usage:  bash hosting-check.sh <base-url> [runs]
#   e.g.  bash hosting-check.sh https://itnode-sito-production.up.railway.app 20
# Needs bash and curl 7.70+. The password is asked at run time and kept in a private temporary
# file: it never appears in the shell history or in the process list.
set -u
H="${1:?usage: bash hosting-check.sh <base-url> [runs]}"; H="${H%/}"; N="${2:-20}"
CFG=$(mktemp); RAW=$(mktemp); trap 'rm -f "$CFG" "$RAW"' EXIT; chmod 600 "$CFG"
read -r -p 'Utente (invio se il sito è pubblico): ' U
if [ -n "$U" ]; then
  read -r -s -p 'Password: ' P; echo
  printf 'user = "%s"\n' "$(printf '%s:%s' "$U" "$P" | sed 's/[\\"]/\\&/g')" > "$CFG"; unset P
fi
AE='Accept-Encoding: gzip, deflate, br, zstd'   # what Chrome sends
c() { curl -K "$CFG" -sS --max-time 30 "$@"; }
T='%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{http_code}\n'
pct() { sort -n | awk '{v[NR]=$1} END {if (NR) printf "mediana %.3f · p75 %.3f · max %.3f s (n=%d)\n", v[int((NR+1)/2)], v[int(NR*0.75+0.999)], v[NR], NR}'; }

echo "== $H · $(date '+%Y-%m-%d %H:%M %Z')"
# 1. First request: after 15+ minutes without traffic it shows a sleeping service waking up.
c -o /dev/null -H "$AE" -w "$T" "$H/" |
  awk '{printf "1. Prima richiesta: HTTP %s, TTFB %.3f s (se il sito era fermo da 15 minuti: tempo di risveglio)\n", $5, $4}'

PAGE=$(c --compressed "$H/")
FONT=$(printf '%s' "$PAGE" | grep -oE '/_astro/[A-Za-z0-9._-]+\.woff2' | head -1)
JS=$(printf '%s' "$PAGE" | grep -oE '/_astro/[A-Za-z0-9._-]+\.js' | head -1)
IMG=$(printf '%s' "$PAGE" | grep -oE '/_astro/[A-Za-z0-9._-]+\.avif' | head -1)

echo '2. Header e compressione (valori attesi: budget.md §6.8)'
for p in / /siii/ /privacy-policy/ "$JS" "$FONT" "$IMG" /favicon.svg; do
  [ -n "$p" ] || continue
  echo "   -- $p"
  c -o /dev/null -D - -H "$AE" -w 'trasferiti: %{size_download} byte\n' "$H$p" | tr -d '\r' |
    grep -iE '^(HTTP/|content-encoding|cache-control|etag|last-modified|vary|accept-ranges|alt-svc|strict-transport-security|set-cookie|server:|x-railway-edge|x-robots-tag|age:|x-cache|trasferiti)' |
    sed 's/^/      /'
done

ET=$(c -o /dev/null -D - -H "$AE" "$H/" | tr -d '\r' | awk 'tolower($1) == "etag:" {print $2}')
if [ -n "$ET" ]; then
  c -o /dev/null -H "$AE" -H "If-None-Match: $ET" -w "3. Rivalidazione dell'HTML con If-None-Match: HTTP %{http_code} (atteso 304)\n" "$H/"
else
  echo "3. Rivalidazione dell'HTML: nessun ETag (serve ETag o Last-Modified)"
fi
[ -n "$FONT" ] && c -o /dev/null -r 0-1023 -w "4. Range 0-1023 su un file binario: HTTP %{http_code}, %{size_download} byte (atteso 206 e 1024)\n" "$H$FONT"
printf '5. Connessione: '
c -v -o /dev/null "$H/" 2>&1 | grep -iE 'SSL connection using|ALPN.*accepted' | sed -E 's/^\* *//' | paste -s -d ';' -
echo
if [ -n "$U" ]; then
  printf '6. Senza credenziali (atteso 401 per tutti): '
  for p in / "$FONT" "$IMG"; do [ -n "$p" ] && curl -s -o /dev/null --max-time 30 -w "$p %{http_code}  " "$H$p"; done
  echo
fi
printf '7. Redirect: '
# After a redirect curl writes the credentials into url_effective: strip them before printing.
for u in "${H/https:/http:}/" "$H/siii"; do
  c -o /dev/null -L -w "$u → %{url_effective} (%{num_redirects} salti)  " "$u"
done | sed -E 's#://[^/@ ]*@#://#g'
echo

echo "8. TTFB a freddo: $N richieste a / (nuova connessione ogni volta, una al secondo)"
for i in $(seq "$N"); do c -o /dev/null -H "$AE" -w "$T" "$H/" >> "$RAW"; sleep 1; done
row() { printf '   %-38s ' "$1"; }
row 'TTFB (DNS + TCP + TLS + attesa)'; awk '{print $4}' "$RAW" | pct
row 'di cui DNS'; awk '{print $1}' "$RAW" | pct
row "RTT verso l'edge (handshake TCP)"; awk '{print $2 - $1}' "$RAW" | pct
row 'attesa dopo la connessione'; awk '{print $4 - ($3 > 0 ? $3 : $2)}' "$RAW" | pct
row "attesa oltre l'RTT (edge e server)"; awk '{print $4 - ($3 > 0 ? $3 : $2) - ($2 - $1)}' "$RAW" | pct
awk '$5 != 200 {n++} END {if (n) printf "   ATTENZIONE: %d risposte diverse da 200\n", n}' "$RAW"
echo '   Soglie (budget.md §6.8): rete mobile p75 ≤ 0,6 s (obiettivo) e ≤ 0,8 s (limite); rete fissa p75 ≤ 0,3 s (atteso).'
echo "Nell'audit: incolla questo output con città, operatore e tipo di rete (fibra, FTTC, 4G, 5G)."
