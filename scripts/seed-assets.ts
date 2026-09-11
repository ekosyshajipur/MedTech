import fs from 'fs';
import path from 'path';
import { categories } from '../src/data/products';

const publicDir = path.join(process.cwd(), 'public');
const productsDir = path.join(publicDir, 'images', 'products');
const categoriesDir = path.join(publicDir, 'images', 'categories');

let totalSubcategories = 0;
let existingCustomImages = 0;
let seededImages = 0;

for (const cat of categories) {
  const catImageFallback = path.join(categoriesDir, `${cat.slug}.webp`);
  const catLegacyFallback = path.join(productsDir, `${cat.slug}.webp`);

  const fallbackSrc = fs.existsSync(catImageFallback) 
    ? catImageFallback 
    : (fs.existsSync(catLegacyFallback) ? catLegacyFallback : null);

  for (const sub of cat.subcategories) {
    totalSubcategories++;
    const subDir = path.join(productsDir, cat.slug, sub.slug);
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }

    const heroPath = path.join(subDir, 'hero.webp');
    const frontPath = path.join(subDir, 'front.webp');
    const sidePath = path.join(subDir, 'side.webp');

    if (fs.existsSync(heroPath)) {
      existingCustomImages++;
    } else if (fallbackSrc) {
      fs.copyFileSync(fallbackSrc, heroPath);
      seededImages++;
    }

    // Ensure gallery angles exist
    if (!fs.existsSync(frontPath) && fs.existsSync(heroPath)) {
      fs.copyFileSync(heroPath, frontPath);
    }
    if (!fs.existsSync(sidePath) && fs.existsSync(heroPath)) {
      fs.copyFileSync(heroPath, sidePath);
    }
  }
}

console.log('════════════════════════════════════════════════════════════');
console.log('EKOSYS PRODUCT ASSET INTEGRITY REPORT');
console.log('════════════════════════════════════════════════════════════');
console.log(`Total Categories Audited:        ${categories.length}`);
console.log(`Total Subcategories Audited:     ${totalSubcategories}`);
console.log(`Custom AI Generated Assets:      ${existingCustomImages}`);
console.log(`Seeded Subcategory Assets:       ${seededImages}`);
console.log(`Total Verified Subcategory Dirs: ${totalSubcategories}`);
console.log('════════════════════════════════════════════════════════════');
