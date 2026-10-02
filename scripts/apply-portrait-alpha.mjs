/**
 * Apply a reviewed background-extraction mask to an ORIGINAL headshot.
 * This keeps all source RGB pixels; the mask contributes transparency only.
 * Usage: node scripts/apply-portrait-alpha.mjs <original> <reviewed-mask-image> <output.webp>
 * Review source/mask alignment visually before using the output in the site.
 * Color-to-monochrome presentation is handled by CSS, not this asset step.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const [source, maskImage, output] = process.argv.slice(2);
if (!source || !maskImage || !output || !output.endsWith('.webp')) {
  throw new Error('Usage: node scripts/apply-portrait-alpha.mjs <original> <reviewed-mask-image> <output.webp>');
}
const { width, height } = await sharp(source).metadata();
const { hasAlpha } = await sharp(maskImage).metadata();
if (!hasAlpha) throw new Error('The reviewed mask image must have transparency.');
const alpha = await sharp(maskImage)
  .resize(width, height, { fit: 'fill' })
  .extractChannel('alpha')
  .raw()
  .toBuffer();
await mkdir(dirname(output), { recursive: true });
// Materialize RGB first: removeAlpha and joinChannel in one Sharp pipeline
// otherwise execute in an order that drops the newly added alpha channel.
const original = await sharp(source).removeAlpha().raw().toBuffer();
await sharp(original, { raw: { width, height, channels: 3 } })
  .joinChannel(alpha, { raw: { width, height, channels: 1 } })
  .webp({ lossless: true, effort: 6 })
  .toFile(output);

if (!(await sharp(output).metadata()).hasAlpha) {
  throw new Error('Output unexpectedly has no alpha channel.');
}
const outputAlpha = await sharp(output).extractChannel('alpha').raw().toBuffer();
const transparentPixels = outputAlpha.reduce((count, value) => count + (value === 0 ? 1 : 0), 0);
if (!transparentPixels) throw new Error('Output unexpectedly has no transparent pixels.');
const retained = await sharp(output).removeAlpha().raw().toBuffer();
let changed = 0;
for (let i = 0; i < original.length; i += 1) {
  if (outputAlpha[Math.floor(i / 3)] > 0 && original[i] !== retained[i]) changed += 1;
}
if (changed) throw new Error(`${changed} visible source RGB channels changed.`);
console.log(`${output}: ${width}×${height}, ${transparentPixels} transparent pixels; original visible pixels verified.`);
