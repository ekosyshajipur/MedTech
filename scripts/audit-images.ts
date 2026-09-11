import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { categories, getAllProducts } from '../src/data/products';

interface AuditResult {
  totalCategories: number;
  totalSubcategories: number;
  totalProducts: number;
  existingCategoryImages: number;
  missingCategoryImages: string[];
  existingSubcategoryImages: number;
  missingSubcategoryImages: string[];
  existingProductImages: number;
  missingProductImages: string[];
  customAiAssetsCount: number;
  backgroundImagesCount: number;
  solutionsImagesCount: number;
  uniqueSha256HashesCount: number;
  totalImageFilesOnDisk: number;
}

const publicDir = path.join(process.cwd(), 'public');

function getSha256(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

export function auditImages(): AuditResult {
  const result: AuditResult = {
    totalCategories: categories.length,
    totalSubcategories: 0,
    totalProducts: 0,
    existingCategoryImages: 0,
    missingCategoryImages: [],
    existingSubcategoryImages: 0,
    missingSubcategoryImages: [],
    existingProductImages: 0,
    missingProductImages: [],
    customAiAssetsCount: 0,
    backgroundImagesCount: 0,
    solutionsImagesCount: 0,
    uniqueSha256HashesCount: 0,
    totalImageFilesOnDisk: 0,
  };

  const hashSet = new Set<string>();

  // 1. Audit Categories
  for (const cat of categories) {
    const relPath = cat.image.replace(/^\//, '');
    const fullPath = path.join(publicDir, relPath);
    if (fs.existsSync(fullPath)) {
      result.existingCategoryImages++;
      hashSet.add(getSha256(fullPath));
    } else {
      result.missingCategoryImages.push(cat.image);
    }

    // 2. Audit Subcategories
    for (const sub of cat.subcategories) {
      result.totalSubcategories++;
      const subRelPath = sub.image.replace(/^\//, '');
      const subFullPath = path.join(publicDir, subRelPath);
      if (fs.existsSync(subFullPath)) {
        result.existingSubcategoryImages++;
        hashSet.add(getSha256(subFullPath));
        const stat = fs.statSync(subFullPath);
        if (stat.size > 40000) {
          result.customAiAssetsCount++;
        }
      } else {
        result.missingSubcategoryImages.push(sub.image);
      }
    }
  }

  // 3. Audit Products
  const allProducts = getAllProducts();
  result.totalProducts = allProducts.length;

  for (const { product } of allProducts) {
    const pRelPath = product.image.replace(/^\//, '');
    const pFullPath = path.join(publicDir, pRelPath);
    if (fs.existsSync(pFullPath)) {
      result.existingProductImages++;
      hashSet.add(getSha256(pFullPath));
    } else {
      result.missingProductImages.push(product.image);
    }
  }

  // 4. Audit Backgrounds & Solutions
  const bgDir = path.join(publicDir, 'images', 'backgrounds');
  if (fs.existsSync(bgDir)) {
    const files = fs.readdirSync(bgDir).filter(f => /\.(webp|png|jpg)$/i.test(f));
    result.backgroundImagesCount = files.length;
    files.forEach(f => hashSet.add(getSha256(path.join(bgDir, f))));
  }

  const solDir = path.join(publicDir, 'images', 'solutions');
  if (fs.existsSync(solDir)) {
    const files = fs.readdirSync(solDir).filter(f => /\.(webp|png|jpg)$/i.test(f));
    result.solutionsImagesCount = files.length;
    files.forEach(f => hashSet.add(getSha256(path.join(solDir, f))));
  }

  // 5. Count total image files in public/images
  function countFiles(dir: string): number {
    let count = 0;
    if (!fs.existsSync(dir)) return 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        count += countFiles(p);
      } else if (/\.(webp|jpg|jpeg|png|svg)$/i.test(entry.name)) {
        count++;
      }
    }
    return count;
  }

  result.totalImageFilesOnDisk = countFiles(path.join(publicDir, 'images'));
  result.uniqueSha256HashesCount = hashSet.size;

  return result;
}

const audit = auditImages();

console.log('════════════════════════════════════════════════════════════');
console.log('EKOSYS CORPORATION — IMAGE SYSTEM AUDIT VERIFICATION');
console.log('════════════════════════════════════════════════════════════');
console.log(`Total Categories:                 ${audit.totalCategories}`);
console.log(`Category Images Verified:         ${audit.existingCategoryImages} / ${audit.totalCategories}`);
console.log(`Total Subcategories:              ${audit.totalSubcategories}`);
console.log(`Subcategory Images Verified:      ${audit.existingSubcategoryImages} / ${audit.totalSubcategories}`);
console.log(`Total Products:                   ${audit.totalProducts}`);
console.log(`Product Hero Images Verified:     ${audit.existingProductImages} / ${audit.totalProducts}`);
console.log(`Background Images:                ${audit.backgroundImagesCount}`);
console.log(`Healthcare Solutions Images:      ${audit.solutionsImagesCount}`);
console.log(`Total Image Files in Catalog:     ${audit.totalImageFilesOnDisk}`);
console.log(`Unique SHA-256 Hashes Detected:   ${audit.uniqueSha256HashesCount}`);
console.log(`Missing Category Images:          ${audit.missingCategoryImages.length}`);
console.log(`Missing Subcategory Images:       ${audit.missingSubcategoryImages.length}`);
console.log(`Missing Product Images:           ${audit.missingProductImages.length}`);
console.log('════════════════════════════════════════════════════════════');

if (audit.missingCategoryImages.length === 0 && 
    audit.missingSubcategoryImages.length === 0 && 
    audit.missingProductImages.length === 0) {
  console.log('STATUS: ZERO 404 BROKEN IMAGES DETECTED. ALL ASSET PATHS VERIFIED.');
} else {
  console.error('STATUS: ASSET VERIFICATION FAILED. Missing files detected.');
  process.exit(1);
}
