// One-off: bakes alpha-mask PNGs for client logos that ship as opaque
// JPEG/WebP (white/near-white background, no alpha channel) so they can be
// recolored in CSS via mask-image. Run with: node scripts/generate-logo-masks.js
const sharp = require("sharp");
const path = require("path");

const DIR = path.join(__dirname, "..", "public", "logos", "clients");
const TARGETS = ["adidas.jpg", "sony-music.jpg", "netflix.webp"];
const MAX_WIDTH = 480;

// JPEG/WebP recompression leaves faint block noise in what should be flat
// white background (e.g. alpha 30-50 across huge swaths). A straight
// distance-from-white alpha bakes that noise in as a visible dither once
// used as a mask, so low values are clamped to 0 and the rest stretched
// back out to preserve crisp edges on the actual logo mark.
const BLACK_POINT = 60;

async function buildMask(file) {
  const input = path.join(DIR, file);
  const img = sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .blur(0.6); // smooths compression blockiness before thresholding
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const alpha = Buffer.alloc(width * height);
  for (let p = 0; p < width * height; p++) {
    const o = p * channels;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    const min = Math.min(r, g, b);
    const raw = 255 - min; // distance from white -> opacity of the mark
    const stretched = ((raw - BLACK_POINT) * 255) / (255 - BLACK_POINT);
    alpha[p] = Math.max(0, Math.min(255, Math.round(stretched)));
  }

  const rgb = Buffer.alloc(width * height * 3, 0); // color is irrelevant, mask uses alpha only
  const outName = file.replace(/\.[^.]+$/, "-mask.png");
  await sharp(rgb, { raw: { width, height, channels: 3 } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(path.join(DIR, outName));
  console.log("wrote", outName, `${width}x${height}`);
}

(async () => {
  for (const file of TARGETS) {
    await buildMask(file);
  }
})();
