// Derives art-directed images from the client's original assets
// (docs/creativa/direzione-visiva.md §4.2–4.3). Originals stay untouched in
// src/assets/images/; outputs go to src/assets/images/derivate/.
// Run with: npm run assets
import sharp from 'sharp';
import { mkdir, rm } from 'node:fs/promises';

const SRC = 'src/assets/images';
const OUT = `${SRC}/derivate`;

/**
 * Event photo crops, in pixels on the 1365×768 original. All of them exclude the social-media
 * overlay (white frame, logo top-left, tagline and ✦ symbol bottom-right). Colour untouched.
 */
const eventCrops = [
  { out: 'evento-panorama.jpg', box: { left: 46, top: 124, width: 1272, height: 560 } }, // 2.27:1
  { out: 'evento-citta.jpg', box: { left: 46, top: 124, width: 448, height: 560 } }, // 4:5, aerial city screen
  { out: 'evento-palco.jpg', box: { left: 470, top: 124, width: 448, height: 560 } }, // 4:5, stage
  { out: 'evento-schermo.jpg', box: { left: 880, top: 124, width: 438, height: 548 } }, // 4:5, 360° square screen
];

/**
 * Founder portraits, «inchiostro» treatment (only because the user chose to use these photos):
 * 1. luminance weighted on the blue channel, so the blue skyline fades towards paper;
 * 2. contrast ×1.2 −30 and tone mapping from inchiostro #141413 to calce #F3F1EC, in one linear step.
 */
const portraits = [
  { src: 'fondatore-braccia-conserte.jpg', out: 'fondatore-ritratto.jpg', box: { left: 566, top: 36, width: 480, height: 480 } },
  { src: 'fondatore-in-piedi.jpg', out: 'fondatore-contatti.jpg', box: { left: 470, top: 40, width: 420, height: 560 } },
];

const INK = [20, 20, 19];
const PAPER = [243, 241, 236];
const k = PAPER.map((p, i) => (p - INK[i]) / 255);
const linearA = k.map((ki) => 1.2 * ki);
const linearB = k.map((ki, i) => -30 * ki + INK[i]);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const { out, box } of eventCrops) {
  await sharp(`${SRC}/evento-puglia-digitale.jpg`).extract(box).jpeg({ quality: 92, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height}`);
}

for (const { src, out, box } of portraits) {
  const lum = [0.15, 0.25, 0.6];
  const grey = await sharp(`${SRC}/${src}`)
    .extract(box)
    .removeAlpha()
    .recomb([lum, lum, lum])
    .toBuffer();
  await sharp(grey).linear(linearA, linearB).jpeg({ quality: 90, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height} (inchiostro)`);
}
