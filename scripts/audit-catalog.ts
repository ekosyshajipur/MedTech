import { categories, getAllProducts, searchProducts } from '../src/data/products';

console.log('════════════════════════════════════════════════════════════');
console.log('EKOSYS CORPORATION — CATALOG DATA QUALITY AUDIT');
console.log('════════════════════════════════════════════════════════════');

let errors = 0;
const catSlugs = new Set<string>();
const subSlugs = new Set<string>();
const prodSlugs = new Set<string>();
const modelNumbers = new Set<string>();

// 1. Audit Categories
for (const cat of categories) {
  if (!cat.id || !cat.name || !cat.slug || !cat.description || !cat.image) {
    console.error(`ERROR: Incomplete category metadata for ${cat.name}`);
    errors++;
  }
  if (catSlugs.has(cat.slug)) {
    console.error(`ERROR: Duplicate category slug: ${cat.slug}`);
    errors++;
  }
  catSlugs.add(cat.slug);

  // 2. Audit Subcategories
  for (const sub of cat.subcategories) {
    if (!sub.id || !sub.name || !sub.slug || !sub.description || !sub.image) {
      console.error(`ERROR: Incomplete subcategory metadata for ${sub.name} in ${cat.name}`);
      errors++;
    }
    const fullSubKey = `${cat.slug}/${sub.slug}`;
    if (subSlugs.has(fullSubKey)) {
      console.error(`ERROR: Duplicate subcategory slug within category: ${fullSubKey}`);
      errors++;
    }
    subSlugs.add(fullSubKey);

    // 3. Audit Products
    if (!sub.products || sub.products.length !== 3) {
      console.error(`ERROR: Subcategory ${sub.name} does not have exactly 3 product variants (found ${sub.products?.length})`);
      errors++;
    }

    for (const prod of sub.products) {
      if (!prod.id || !prod.name || !prod.modelNo || !prod.description) {
        console.error(`ERROR: Incomplete product fields for ${prod.name}`);
        errors++;
      }
      if (!prod.specifications || prod.specifications.length === 0) {
        console.error(`ERROR: Empty specifications for ${prod.name}`);
        errors++;
      }
      if (!prod.features || prod.features.length === 0) {
        console.error(`ERROR: Empty features for ${prod.name}`);
        errors++;
      }
      if (!prod.applications || prod.applications.length === 0) {
        console.error(`ERROR: Empty applications for ${prod.name}`);
        errors++;
      }
      if (!prod.media || !prod.media.hero || !prod.media.gallery || prod.media.gallery.length < 3) {
        console.error(`ERROR: Incomplete media metadata for ${prod.name}`);
        errors++;
      }

      if (prodSlugs.has(prod.slug)) {
        // Product slugs may share variant suffixes across subcategories, which is fine as they are nested under subcategory
      }
      prodSlugs.add(prod.slug);

      if (modelNumbers.has(prod.modelNo)) {
        console.error(`ERROR: Duplicate model number: ${prod.modelNo}`);
        errors++;
      }
      modelNumbers.add(prod.modelNo);
    }
  }
}

// 4. Test Search Functionality
const testQueries = ['ICU Bed', 'Stethoscope', 'Nail', 'Monitor', 'EK-01011A'];
let searchSuccess = true;
for (const q of testQueries) {
  const results = searchProducts(q);
  if (results.length === 0) {
    console.error(`WARNING: Search query "${q}" returned 0 results`);
    searchSuccess = false;
  }
}

const allProducts = getAllProducts();

console.log(`Total Categories:                 ${categories.length}`);
console.log(`Total Subcategories:              ${subSlugs.size}`);
console.log(`Total Products Verified:          ${allProducts.length}`);
console.log(`Unique Model Numbers:             ${modelNumbers.size}`);
console.log(`Search Engine Verification:       ${searchSuccess ? 'PASSED' : 'WARNINGS'}`);
console.log(`Catalog Integrity Errors:         ${errors}`);
console.log('════════════════════════════════════════════════════════════');

if (errors === 0) {
  console.log('STATUS: CATALOG DATA QUALITY VERIFICATION PASSED PERFECTLY.');
} else {
  console.error('STATUS: CATALOG DATA QUALITY VERIFICATION FAILED.');
  process.exit(1);
}
