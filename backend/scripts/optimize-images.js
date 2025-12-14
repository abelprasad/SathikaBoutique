const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../uploads/products');
const files = fs.readdirSync(uploadsDir).filter(f => f.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/));

console.log(`Found ${files.length} images to optimize...`);

let optimized = 0;

async function optimizeImage(filename) {
  const inputPath = path.join(uploadsDir, filename);
  const stats = fs.statSync(inputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  // Skip if already small enough (< 500KB)
  if (stats.size < 500 * 1024) {
    console.log(`✓ ${filename} already optimized (${sizeMB}MB)`);
    return;
  }

  console.log(`Optimizing ${filename} (${sizeMB}MB)...`);

  try {
    // Create backup
    const backupPath = inputPath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    // Optimize: resize to max 1200px width, quality 85
    await sharp(inputPath)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(inputPath + '.optimized');

    // Replace original with optimized
    fs.renameSync(inputPath + '.optimized', inputPath);

    const newStats = fs.statSync(inputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ ${filename}: ${sizeMB}MB → ${newSizeMB}MB (saved ${savings}%)`);
    optimized++;
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeAll() {
  for (const file of files) {
    await optimizeImage(file);
  }

  console.log(`\nDone! Optimized ${optimized} of ${files.length} images.`);
  console.log('Original images backed up with .backup extension');
}

optimizeAll();
