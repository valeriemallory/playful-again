// Reads real pixel dimensions from each image folder and updates the gallery JSON data files.
// Run: npm run gen   (or: node scripts/gen-image-data.js)
//
// Copied from valerie-mallory-studio/scripts/gen-image-data.js (itself adapted from
// keystonejade-website/scripts/gen-image-data.js). Unlike the original, this
// version MERGES into the existing JSON instead of overwriting it, so it is safe to re-run:
//   - existing entries keep their alt text and gallery order (dimensions are refreshed)
//   - new images in the folder are appended to the end with an empty alt (fill these in)
//   - entries whose image file no longer exists are removed
//   - only files matching a section's optional `include` regex are used, and
//     files matching its optional `exclude` regex are skipped (both match the name without extension)
// To reorder a gallery, reorder the entries in its JSON file by hand.
import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');

// Both galleries share static/img/gallery and are split by file-name prefix.
const sections = [
  {
    folder: 'static/img/gallery',
    output: 'src/lib/data/gallery-photos.json',
    urlBase: '/img/gallery',
    include: /^bm_2023_/,
    // Deliberately left out of the photo gallery (the files are kept in the folder)
    exclude: /^bm_2023_img_(4275|4308-a|4949|4984)$/,
  },
  {
    folder: 'static/img/gallery',
    output: 'src/lib/data/gallery-concept-art.json',
    urlBase: '/img/gallery',
    include: /^concept_art_/,
  },
];

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

async function readExisting(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function getDimensions(filePath) {
  const meta = await sharp(filePath).metadata();
  // EXIF orientations 5–8 are rotated 90°, so the displayed width/height are swapped
  const rotated = (meta.orientation ?? 1) >= 5;
  return {
    width: (rotated ? meta.height : meta.width) ?? 0,
    height: (rotated ? meta.width : meta.height) ?? 0,
  };
}

await mkdir(join(root, 'src/lib/data'), { recursive: true });

for (const section of sections) {
  const folderPath = join(root, section.folder);
  const outputPath = join(root, section.output);

  const files = (await readdir(folderPath))
    .filter(f => IMAGE_EXTS.has(parse(f).ext.toLowerCase()))
    .filter(f => !section.include || section.include.test(parse(f).name))
    .filter(f => !section.exclude?.test(parse(f).name))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const existing = await readExisting(outputPath);
  const srcToFile = new Map(files.map(f => [`${section.urlBase}/${f}`, f]));

  const photos = [];
  const seen = new Set();
  let added = 0;
  let removed = 0;

  // Keep existing entries (in their current order) whose files still exist
  for (const entry of existing) {
    const file = srcToFile.get(entry.src);
    if (!file) {
      removed++;
      console.log(`  - removed ${entry.src} (file not found or excluded)`);
      continue;
    }
    try {
      photos.push({ ...entry, ...(await getDimensions(join(folderPath, file))) });
      seen.add(entry.src);
    } catch (err) {
      console.warn(`  ⚠ Skipping ${file}: ${err.message}`);
    }
  }

  // Append new files
  for (const [src, file] of srcToFile) {
    if (seen.has(src)) continue;
    try {
      photos.push({ id: parse(file).name, src, alt: '', ...(await getDimensions(join(folderPath, file))) });
      added++;
      console.log(`  + added ${src} (needs alt text)`);
    } catch (err) {
      console.warn(`  ⚠ Skipping ${file}: ${err.message}`);
    }
  }

  await writeFile(outputPath, JSON.stringify(photos, null, 2) + '\n');
  console.log(`✓ ${section.output}  (${photos.length} photos, ${added} added, ${removed} removed)`);
}

console.log('\nDone. Fill in alt text for any newly added entries (alt: "") for accessibility and SEO.');
console.log('NOTE: Image filenames are case-sensitive on Netlify. Src paths in JSON must match file casing exactly.');
