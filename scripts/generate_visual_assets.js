// scripts/generate_visual_assets.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..');
const backgroundsDir = path.join(baseDir, 'public', 'images', 'backgrounds');
const solutionsDir = path.join(baseDir, 'public', 'images', 'solutions');

// Ensure directories exist
fs.mkdirSync(backgroundsDir, { recursive: true });
fs.mkdirSync(solutionsDir, { recursive: true });

function getSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Background Visuals
const backgrounds = [
  {
    name: 'hero-medical-theatre.webp',
    width: 1920,
    height: 1080,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#022c22"/>
            <stop offset="40%" stop-color="#064e3b"/>
            <stop offset="75%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
          <radialGradient id="otLight" cx="65%" cy="35%" r="45%">
            <stop offset="0%" stop-color="#34d399" stop-opacity="0.35"/>
            <stop offset="40%" stop-color="#059669" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="softBlue" cx="20%" cy="80%" r="50%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" stroke-width="0.75" stroke-opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#bg)"/>
        <rect width="${w}" height="${h}" fill="url(#grid)"/>
        <rect width="${w}" height="${h}" fill="url(#otLight)"/>
        <rect width="${w}" height="${h}" fill="url(#softBlue)"/>
        
        <!-- Cleanroom Architectural Guidelines -->
        <g stroke="#10b981" stroke-opacity="0.25" stroke-width="1.5" fill="none">
          <circle cx="1250" cy="380" r="180" stroke-dasharray="8 6"/>
          <circle cx="1250" cy="380" r="140" stroke-dasharray="4 4"/>
          <circle cx="1250" cy="380" r="40" stroke="#34d399" stroke-width="2"/>
          <line x1="1250" y1="100" x2="1250" y2="340" stroke-width="4" stroke="#059669"/>
          <line x1="900" y1="580" x2="1600" y2="580" stroke-width="2"/>
          <path d="M 1100 580 L 1150 720 L 1350 720 L 1400 580" stroke-width="3"/>
          <line x1="1120" y1="720" x2="1380" y2="720" stroke-width="6" stroke="#059669"/>
        </g>
        
        <!-- Vital Signs Pulse Graph -->
        <path d="M 0 820 L 400 820 L 440 760 L 470 870 L 510 740 L 550 840 L 580 820 L 1920 820" 
              fill="none" stroke="#34d399" stroke-width="2" stroke-opacity="0.3"/>
      </svg>
    `
  },
  {
    name: 'icu-critical-care.webp',
    width: 1600,
    height: 900,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="icuBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#064e3b"/>
            <stop offset="50%" stop-color="#042f2e"/>
            <stop offset="100%" stop-color="#021c17"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#icuBg)"/>
        <rect width="${w}" height="${h}" fill="url(#glow)"/>
        <!-- Monitoring Waveforms -->
        <g fill="none" stroke-width="2">
          <path d="M 50 250 L 300 250 L 330 200 L 350 310 L 380 180 L 410 270 L 430 250 L 1550 250" stroke="#34d399" stroke-opacity="0.6"/>
          <path d="M 50 350 L 500 350 Q 560 300 620 350 T 740 350 Q 800 300 860 350 L 1550 350" stroke="#38bdf8" stroke-opacity="0.5"/>
          <path d="M 50 450 L 200 450 L 240 420 L 280 480 L 320 450 L 1550 450" stroke="#fbbf24" stroke-opacity="0.4"/>
        </g>
        <!-- Bed Outline Geometric -->
        <g stroke="#10b981" stroke-opacity="0.3" stroke-width="3" fill="none">
          <rect x="450" y="520" width="700" height="24" rx="8"/>
          <rect x="420" y="460" width="30" height="120" rx="6"/>
          <rect x="1150" y="480" width="30" height="100" rx="6"/>
          <line x1="550" y1="544" x2="550" y2="680" stroke-width="8"/>
          <line x1="1050" y1="544" x2="1050" y2="680" stroke-width="8"/>
          <line x1="500" y1="680" x2="1100" y2="680" stroke-width="8"/>
          <circle cx="550" cy="710" r="22" stroke-width="4"/>
          <circle cx="1050" cy="710" r="22" stroke-width="4"/>
        </g>
      </svg>
    `
  },
  {
    name: 'operating-theatre-cleanroom.webp',
    width: 1600,
    height: 900,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="otBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="50%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#022c22"/>
          </linearGradient>
          <radialGradient id="otGlow" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#otBg)"/>
        <rect width="${w}" height="${h}" fill="url(#otGlow)"/>
        <!-- Surgical Dome Light Illustration -->
        <g stroke="#14b8a6" stroke-width="2" fill="none">
          <ellipse cx="800" cy="240" rx="200" ry="70" stroke-width="4"/>
          <ellipse cx="800" cy="240" rx="140" ry="48"/>
          <ellipse cx="800" cy="240" rx="80" ry="28"/>
          <circle cx="800" cy="240" r="20" fill="#2dd4bf" fill-opacity="0.8"/>
          <line x1="800" y1="0" x2="800" y2="170" stroke-width="6" stroke="#64748b"/>
          <!-- Light Cone -->
          <polygon points="620,270 980,270 1200,800 400,800" fill="#2dd4bf" fill-opacity="0.08" stroke="none"/>
        </g>
      </svg>
    `
  },
  {
    name: 'diagnostic-imaging-suite.webp',
    width: 1600,
    height: 900,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="diagBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="50%" stop-color="#0369a1"/>
            <stop offset="100%" stop-color="#021c17"/>
          </linearGradient>
          <radialGradient id="diagGlow" cx="60%" cy="50%" r="45%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#diagBg)"/>
        <rect width="${w}" height="${h}" fill="url(#diagGlow)"/>
        <!-- C-Arm Scanner Geometric Outline -->
        <g stroke="#38bdf8" stroke-width="4" fill="none" stroke-opacity="0.5">
          <path d="M 850 200 A 300 300 0 1 0 1150 700" stroke-width="12" stroke-linecap="round"/>
          <rect x="750" y="150" width="160" height="90" rx="10" fill="#0284c7" fill-opacity="0.3"/>
          <rect x="1100" y="650" width="160" height="90" rx="10" fill="#0284c7" fill-opacity="0.3"/>
          <line x1="830" y1="240" x2="1180" y2="650" stroke-dasharray="6 6" stroke-width="2" stroke="#7dd3fc"/>
        </g>
      </svg>
    `
  },
  {
    name: 'laboratory-research.webp',
    width: 1600,
    height: 900,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="labBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#042f2e"/>
            <stop offset="50%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
          <radialGradient id="labGlow" cx="45%" cy="45%" r="40%">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#labBg)"/>
        <rect width="${w}" height="${h}" fill="url(#labGlow)"/>
        <!-- Molecular / Centrifuge Scientific Graphic -->
        <g stroke="#2dd4bf" stroke-width="2" fill="none" stroke-opacity="0.4">
          <circle cx="800" cy="450" r="220" stroke-dasharray="10 8"/>
          <circle cx="800" cy="450" r="160"/>
          <circle cx="800" cy="450" r="90" stroke-width="4"/>
          <line x1="800" y1="230" x2="800" y2="670"/>
          <line x1="580" y1="450" x2="1020" y2="450"/>
          <circle cx="800" cy="230" r="12" fill="#2dd4bf"/>
          <circle cx="800" cy="670" r="12" fill="#2dd4bf"/>
          <circle cx="580" cy="450" r="12" fill="#2dd4bf"/>
          <circle cx="1020" cy="450" r="12" fill="#2dd4bf"/>
        </g>
      </svg>
    `
  },
  {
    name: 'quality-manufacturing.webp',
    width: 1600,
    height: 900,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="qBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#022c22"/>
            <stop offset="50%" stop-color="#064e3b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <radialGradient id="qGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#qBg)"/>
        <rect width="${w}" height="${h}" fill="url(#qGlow)"/>
        <!-- Engineering Vernier / Precision Caliper Geometric Design -->
        <g stroke="#34d399" stroke-width="3" fill="none" stroke-opacity="0.5">
          <rect x="400" y="380" width="800" height="140" rx="8"/>
          <!-- Caliper Jaws -->
          <path d="M 450 380 L 450 620 L 490 620 L 490 380" fill="#059669" fill-opacity="0.3"/>
          <path d="M 750 380 L 750 620 L 790 620 L 790 380" fill="#059669" fill-opacity="0.3"/>
          <!-- Measurement Grids -->
          <line x1="450" y1="450" x2="1150" y2="450" stroke-width="2"/>
          <line x1="500" y1="435" x2="500" y2="465"/>
          <line x1="550" y1="440" x2="550" y2="460"/>
          <line x1="600" y1="435" x2="600" y2="465"/>
          <line x1="650" y1="440" x2="650" y2="460"/>
          <line x1="700" y1="435" x2="700" y2="465"/>
          <line x1="750" y1="440" x2="750" y2="460"/>
          <line x1="800" y1="435" x2="800" y2="465"/>
        </g>
      </svg>
    `
  }
];

// Healthcare Solutions Images
const solutions = [
  {
    name: 'icu-setup.webp',
    width: 1200,
    height: 800,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sIcu" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#022c22"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#sIcu)"/>
        <!-- Bed and Pendant Setup -->
        <g stroke="#34d399" stroke-width="3" fill="none">
          <rect x="350" y="420" width="500" height="200" rx="12" fill="#047857" fill-opacity="0.2"/>
          <rect x="280" y="440" width="40" height="160" rx="8"/>
          <rect x="880" y="470" width="40" height="120" rx="8"/>
          <!-- Overhead ICU Pendant Arm -->
          <line x1="600" y1="0" x2="600" y2="200" stroke-width="8" stroke="#10b981"/>
          <rect x="520" y="200" width="160" height="100" rx="8" fill="#065f46"/>
          <rect x="540" y="220" width="120" height="60" rx="4" fill="#34d399" fill-opacity="0.4"/>
        </g>
      </svg>
    `
  },
  {
    name: 'ot-setup.webp',
    width: 1200,
    height: 800,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sOt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#042f2e"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#sOt)"/>
        <!-- Twin OT Light and Table -->
        <g stroke="#14b8a6" stroke-width="3" fill="none">
          <ellipse cx="450" cy="180" rx="120" ry="40" fill="#0d9488" fill-opacity="0.3"/>
          <ellipse cx="750" cy="220" rx="140" ry="48" fill="#0d9488" fill-opacity="0.3"/>
          <line x1="450" y1="0" x2="450" y2="140" stroke-width="6"/>
          <line x1="750" y1="0" x2="750" y2="170" stroke-width="6"/>
          <!-- OT Table -->
          <rect x="350" y="480" width="500" height="70" rx="10" fill="#14b8a6" fill-opacity="0.2"/>
          <line x1="600" y1="550" x2="600" y2="680" stroke-width="24" stroke="#475569"/>
          <rect x="500" y="680" width="200" height="30" rx="6" fill="#334155"/>
        </g>
      </svg>
    `
  },
  {
    name: 'hospital-furniture.webp',
    width: 1200,
    height: 800,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sFurn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#065f46"/><stop offset="100%" stop-color="#064e3b"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#sFurn)"/>
        <!-- Ward Fowler Bed & Bedside Cabinet -->
        <g stroke="#6ee7b7" stroke-width="3" fill="none">
          <rect x="250" y="440" width="480" height="90" rx="8" fill="#047857" fill-opacity="0.3"/>
          <rect x="200" y="380" width="30" height="170" rx="6"/>
          <rect x="750" y="400" width="30" height="150" rx="6"/>
          <circle cx="260" cy="580" r="18" stroke-width="4"/>
          <circle cx="720" cy="580" r="18" stroke-width="4"/>
          <!-- Bedside Locker -->
          <rect x="850" y="420" width="140" height="180" rx="10" fill="#047857" fill-opacity="0.4"/>
          <rect x="870" y="450" width="100" height="40" rx="4"/>
          <line x1="870" y1="520" x2="970" y2="520"/>
        </g>
      </svg>
    `
  },
  {
    name: 'diagnostic-setup.webp',
    width: 1200,
    height: 800,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sDiag" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0369a1"/><stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#sDiag)"/>
        <!-- Ultrasound & Diagnostic Monitor -->
        <g stroke="#38bdf8" stroke-width="3" fill="none">
          <rect x="400" y="240" width="400" height="260" rx="12" fill="#0284c7" fill-opacity="0.3"/>
          <rect x="430" y="270" width="340" height="200" rx="8" fill="#0c4a6e"/>
          <!-- Scanner probe -->
          <path d="M 600 500 Q 650 620 720 620 L 760 620" stroke-width="6"/>
          <rect x="760" y="605" width="50" height="30" rx="6" fill="#38bdf8"/>
        </g>
      </svg>
    `
  },
  {
    name: 'emergency-care.webp',
    width: 1200,
    height: 800,
    renderSvg: (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sEmerg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#991b1b"/><stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#sEmerg)"/>
        <!-- Emergency Stretcher & Resuscitation Cross -->
        <g stroke="#fca5a5" stroke-width="3" fill="none">
          <rect x="300" y="460" width="600" height="90" rx="12" fill="#b91c1c" fill-opacity="0.3"/>
          <line x1="400" y1="550" x2="500" y2="670" stroke-width="8"/>
          <line x1="800" y1="550" x2="700" y2="670" stroke-width="8"/>
          <circle cx="450" cy="690" r="22" stroke-width="4"/>
          <circle cx="750" cy="690" r="22" stroke-width="4"/>
          <!-- Red Cross Icon -->
          <g fill="#ef4444" stroke="none">
            <rect x="575" y="220" width="50" height="140" rx="6"/>
            <rect x="530" y="265" width="140" height="50" rx="6"/>
          </g>
        </g>
      </svg>
    `
  }
];

async function generateAssets() {
  const manifest = [];

  console.log('Generating Background Assets...');
  for (const item of backgrounds) {
    const outputPath = path.join(backgroundsDir, item.name);
    const svgBuffer = Buffer.from(item.renderSvg(item.width, item.height));
    await sharp(svgBuffer)
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    const hash = getSha256(outputPath);
    console.log(`Generated: ${item.name} (${hash.substring(0, 12)}...)`);
    manifest.push({
      type: 'background',
      fileName: item.name,
      relPath: `/images/backgrounds/${item.name}`,
      width: item.width,
      height: item.height,
      hash,
      status: 'created'
    });
  }

  console.log('Generating Healthcare Solutions Assets...');
  for (const item of solutions) {
    const outputPath = path.join(solutionsDir, item.name);
    const svgBuffer = Buffer.from(item.renderSvg(item.width, item.height));
    await sharp(svgBuffer)
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    const hash = getSha256(outputPath);
    console.log(`Generated: ${item.name} (${hash.substring(0, 12)}...)`);
    manifest.push({
      type: 'solution',
      fileName: item.name,
      relPath: `/images/solutions/${item.name}`,
      width: item.width,
      height: item.height,
      hash,
      status: 'created'
    });
  }

  const manifestPath = path.join(baseDir, 'image-generation-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Saved manifest to ${manifestPath}`);
}

generateAssets().catch(err => {
  console.error('Asset generation error:', err);
  process.exit(1);
});
