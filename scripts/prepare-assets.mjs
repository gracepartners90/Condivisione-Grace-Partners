// Derives art-directed crops from the client's original assets.
// Originals stay untouched in src/assets/images/; outputs go to src/assets/images/derivate/.
// Run with: npm run assets
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'src/assets/images';
const OUT = `${SRC}/derivate`;

/** Each crop: source file, output file, extraction box in source pixels. */
const crops = [
  // Event photo without the social-media overlay (frame, logo top-left, tagline bottom-right).
  { src: 'evento-puglia-digitale.jpg', out: 'evento-panoramica.jpg', box: { left: 45, top: 125, width: 1277, height: 560 } },
  // Stage detail: speaker, backdrop and the right-hand screen showing a 360° square.
  { src: 'evento-puglia-digitale.jpg', out: 'evento-palco.jpg', box: { left: 380, top: 60, width: 942, height: 500 } },
  // Square crop centred on the speaker for small screens.
  { src: 'evento-puglia-digitale.jpg', out: 'evento-quadrato.jpg', box: { left: 330, top: 125, width: 560, height: 560 } },
];

await mkdir(OUT, { recursive: true });
for (const { src, out, box } of crops) {
  await sharp(`${SRC}/${src}`).extract(box).jpeg({ quality: 92, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(`${out}  ${box.width}×${box.height}`);
}
