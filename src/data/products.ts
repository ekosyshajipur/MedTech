// ═══════════════════════════════════════════════════════════════════
// EKOSYS Corporation — Complete Medical Equipment Product Catalog
// 31 Categories · 206 Subcategories · 618 Products
// ═══════════════════════════════════════════════════════════════════

import { getSubcategoryMetadata, SubcategoryMeta } from './catalogMeta';

export interface ProductMedia {
  hero: string;
  gallery: string[];
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  modelNo: string;
  description: string;
  specifications: string[];
  features: string[];
  image: string;
  gallery: string[];
  media: ProductMedia;
  leadTime: string;
  certifications: string[];
  warranty: string;
  applications: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: SubCategory[];
}

// ─── Subcategory-specific product metadata ───────────────────────
// Each subcategory gets unique description, features, specs, applications, and alt text.

function getSubcategoryMeta(categorySlug: string, subName: string): SubcategoryMeta {
  const key = `${categorySlug}/${subName.toLowerCase()}`;
  
  // ── Hospital Medical Furniture ──
  const metaMap: Record<string, SubcategoryMeta> = {
    // Hospital Medical Furniture
    'hospital-medical-furniture/icu beds': {
      description: 'Intensive care unit bed designed for critical patient monitoring with multi-position adjustment, integrated side rails, and advanced patient positioning capabilities.',
      features: ['Multi-position electric/manual adjustment', 'Collapsible ABS side safety rails', 'Four-section bed platform with Trendelenburg', 'Central locking castor wheels with brake', 'IV pole mount and drainage hook integrated'],
      specifications: ['Platform: Four-section CRCA perforated', 'Dimensions: 2180 x 900 x 500-800mm adjustable', 'Safe Working Load: 250 kg', 'Side Rails: Collapsible ABS/SS construction', 'Wheels: 150mm TPR central locking castors'],
      applications: ['Intensive Care Units', 'Critical Care Wards', 'Post-Operative Recovery', 'High Dependency Units'],
      altPrefix: 'ICU hospital bed with adjustable side rails'
    },
    'hospital-medical-furniture/fowler beds': {
      description: 'Fowler position hospital bed enabling backrest and knee-rest adjustment for patient comfort during recovery and convalescence.',
      features: ['Adjustable backrest with gas spring mechanism', 'Knee-rest section for circulation support', 'Detachable ABS head and foot boards', 'Tubular frame with epoxy powder coating', 'Self-locking castors with directional control'],
      specifications: ['Platform: Two-section MS perforated', 'Dimensions: 2030 x 900 x 600mm', 'Backrest Angle: 0-80 degrees adjustable', 'Weight Capacity: 200 kg', 'Material: Mild steel tubular frame CRCA'],
      applications: ['General Wards', 'Surgical Recovery', 'Rehabilitation Centers', 'Long-term Care Facilities'],
      altPrefix: 'Fowler position hospital bed'
    },
    'hospital-medical-furniture/semi fowler beds': {
      description: 'Semi-Fowler hospital bed with manual backrest adjustment capability, designed for general ward usage and patient comfort.',
      features: ['Manual backrest elevation mechanism', 'Perforated MS bed platform', 'Removable head and foot panels', 'Anti-bacterial powder-coated finish', 'Four-wheel mobility with locking brakes'],
      specifications: ['Platform: Single-section with manual crank', 'Dimensions: 1980 x 900 x 600mm', 'Backrest Angle: 0-60 degrees', 'Weight Capacity: 180 kg', 'Frame: 32mm round MS tubular'],
      applications: ['General Hospital Wards', 'Nursing Homes', 'Community Health Centers', 'Home Healthcare'],
      altPrefix: 'Semi-Fowler hospital bed'
    },
    'hospital-medical-furniture/plain hospital beds': {
      description: 'Standard plain hospital bed with fixed flat platform for general patient accommodation in wards and clinics.',
      features: ['Fixed flat bed platform', 'Tubular steel frame construction', 'Detachable head and foot boards', 'Four castor wheels with brakes', 'Easy-clean epoxy powder coating'],
      specifications: ['Platform: Single fixed section', 'Dimensions: 1980 x 900 x 600mm', 'Weight Capacity: 180 kg', 'Material: MS tubular 32mm frame', 'Finish: Epoxy powder coated'],
      applications: ['General Wards', 'Emergency Departments', 'Primary Health Centers', 'Field Hospitals'],
      altPrefix: 'Plain hospital bed'
    },
    'hospital-medical-furniture/orthopaedic beds': {
      description: 'Orthopaedic traction bed with Balkan beam frame for skeletal and skin traction therapy in fracture management.',
      features: ['Balkan beam frame for traction setup', 'Adjustable traction weights and pulleys', 'Split-leg platform section', 'Removable foot-end panel', 'Heavy-duty castor system'],
      specifications: ['Platform: Three-section with traction frame', 'Dimensions: 2130 x 900 x 600mm', 'Balkan Beam: Adjustable height SS frame', 'Weight Capacity: 200 kg', 'Traction Accessories: Pulleys, weights, cord'],
      applications: ['Orthopaedic Wards', 'Trauma Centers', 'Fracture Clinics', 'Rehabilitation Units'],
      altPrefix: 'Orthopaedic traction bed with Balkan frame'
    },
    'hospital-medical-furniture/baby crib': {
      description: 'Hospital-grade infant crib with transparent bassinet, height-adjustable stand, and safety features for neonatal and pediatric care.',
      features: ['Transparent acrylic bassinet tray', 'Height-adjustable stainless steel stand', 'Trendelenburg tilt capability', 'Storage shelf underneath', 'Silent-running swivel castors'],
      specifications: ['Bassinet: Acrylic transparent 750x400x180mm', 'Stand Height: 800-1100mm adjustable', 'Material: SS 304 frame', 'Weight Capacity: 25 kg', 'Wheels: 75mm silent swivel castors'],
      applications: ['Maternity Wards', 'Neonatal Units', 'Pediatric Departments', 'Nursery Rooms'],
      altPrefix: 'Hospital baby crib with acrylic bassinet'
    },
    'hospital-medical-furniture/hospital beds mattress': {
      description: 'Medical-grade hospital mattress designed for infection control, pressure distribution, and patient comfort in clinical settings.',
      features: ['High-density medical foam construction', 'Waterproof PU-coated cover', 'Anti-bacterial and anti-fungal treatment', 'Four-fold section design', 'Fire-retardant materials'],
      specifications: ['Dimensions: 1980 x 900 x 100mm', 'Foam Density: 40 kg/m³ medical grade', 'Cover: Waterproof PU coated nylon', 'Sections: Four-fold for Fowler beds', 'Weight: 8 kg'],
      applications: ['Hospital Beds', 'ICU Beds', 'Examination Couches', 'Patient Transport'],
      altPrefix: 'Hospital medical mattress'
    },
    'hospital-medical-furniture/bedside cabinets': {
      description: 'Compact bedside locker cabinet with overbed table attachment for patient belongings storage in hospital wards.',
      features: ['Single drawer with cupboard storage', 'Integrated overbed table attachment', 'Smooth-rolling castor wheels', 'Easy-clean ABS/MS construction', 'Lockable drawer option'],
      specifications: ['Dimensions: 400 x 400 x 800mm', 'Material: ABS top / MS frame', 'Drawer: Single pull-out drawer', 'Cupboard: Single door with shelf', 'Wheels: 50mm swivel castors'],
      applications: ['Hospital Wards', 'Patient Rooms', 'ICU Bedsides', 'Nursing Homes'],
      altPrefix: 'Hospital bedside cabinet locker'
    },
    'hospital-medical-furniture/bedside screens': {
      description: 'Privacy screen panel system for patient modesty and ward division in hospitals, with easy-fold and mobile design.',
      features: ['Three/four-panel folding design', 'Opaque curtain fabric panels', 'Tubular steel frame with castors', 'Flame-retardant curtain material', 'Easy fold-away storage'],
      specifications: ['Panels: 3 or 4 sections', 'Panel Size: 600 x 1700mm each', 'Frame: MS tubular powder coated', 'Fabric: FR-treated curtain material', 'Mobility: 50mm swivel castors'],
      applications: ['Hospital Wards', 'Examination Rooms', 'Emergency Departments', 'Out-Patient Clinics'],
      altPrefix: 'Hospital bedside privacy screen'
    },
    'hospital-medical-furniture/overbed tables': {
      description: 'Height-adjustable overbed table for patient meal service and activity support, with tiltable top surface.',
      features: ['Height-adjustable mechanism', 'Tiltable laminated top surface', 'C-shaped base slides under bed', 'Four castor mobility system', 'Sturdy tubular steel frame'],
      specifications: ['Top Size: 800 x 400mm laminated', 'Height Range: 700-1100mm adjustable', 'Base: C-shaped MS tubular', 'Weight Capacity: 20 kg', 'Wheels: 50mm swivel castors'],
      applications: ['Patient Bedside Use', 'Hospital Wards', 'Nursing Homes', 'Home Healthcare'],
      altPrefix: 'Hospital overbed table'
    },
    'hospital-medical-furniture/iv pole saline stands': {
      description: 'Stainless steel IV pole stand with multiple hooks for intravenous fluid administration in clinical settings.',
      features: ['Telescopic height adjustment', 'Four stainless steel hooks', 'Five-leg weighted base', 'Easy-roll nylon castors', 'Rust-proof SS 304 construction'],
      specifications: ['Height: 1400-2200mm telescopic', 'Hooks: 4 SS hooks', 'Base: Five-leg weighted base', 'Material: SS 304 grade pole', 'Wheels: 50mm nylon castors'],
      applications: ['Hospital Wards', 'ICU', 'Operating Theaters', 'Emergency Departments'],
      altPrefix: 'Stainless steel IV pole saline stand'
    },
    'hospital-medical-furniture/examination table': {
      description: 'Clinical examination couch with adjustable backrest and paper roll holder for patient diagnostic examinations.',
      features: ['Adjustable backrest section', 'Paper roll holder integrated', 'Step stool included', 'Washable upholstery', 'Storage shelf underneath'],
      specifications: ['Dimensions: 1850 x 600 x 750mm', 'Upholstery: Washable Rexine', 'Backrest: 0-70 degree adjustment', 'Frame: MS tubular construction', 'Weight Capacity: 180 kg'],
      applications: ['OPD Clinics', 'Diagnostic Centers', 'GP Practices', 'Health Check-Up Centers'],
      altPrefix: 'Clinical examination table'
    },
    'hospital-medical-furniture/obstetric tables': {
      description: 'Obstetric delivery table with leg supports, drainage system, and multi-position adjustment for labor and delivery.',
      features: ['Adjustable lithotomy leg supports', 'Drainage tray with outlet', 'Removable stainless steel tray', 'Trendelenburg and reverse capability', 'Height-adjustable hydraulic system'],
      specifications: ['Dimensions: 1850 x 600 x 750-950mm', 'Leg Supports: Adjustable stirrup type', 'Drainage: SS tray with outlet', 'Height: Hydraulic adjustment', 'Weight Capacity: 200 kg'],
      applications: ['Labor and Delivery Rooms', 'Maternity Wards', 'Gynecology Departments', 'Birth Centers'],
      altPrefix: 'Obstetric delivery table'
    },
    'hospital-medical-furniture/foot stools': {
      description: 'Medical single/double step stool for patient and staff use in hospital environments.',
      features: ['Anti-slip rubber top surface', 'Stainless steel construction', 'Single or double step options', 'Rounded safety edges', 'Stackable design'],
      specifications: ['Single Step: 350 x 300 x 200mm', 'Double Step: 500 x 400 x 400mm', 'Material: SS 304 / MS powder coated', 'Surface: Anti-slip rubber pad', 'Weight Capacity: 150 kg'],
      applications: ['Hospital Wards', 'Examination Rooms', 'Operating Theaters', 'Diagnostic Centers'],
      altPrefix: 'Medical step foot stool'
    },
    'hospital-medical-furniture/trolley': {
      description: 'Multi-purpose stainless steel hospital trolley for instrument transport, dressing procedures, and ward utility.',
      features: ['Two/three-shelf stainless steel design', 'Guard rails on shelves', 'Push handle integrated', 'Silent-running castor wheels', 'Easy-clean polished SS surface'],
      specifications: ['Top Shelf: 750 x 450mm', 'Material: SS 304 grade sheets', 'Shelves: 2 or 3 tier configuration', 'Height: 850mm', 'Wheels: 100mm TPR castors'],
      applications: ['Operating Theaters', 'Hospital Wards', 'Emergency Departments', 'Procedure Rooms'],
      altPrefix: 'Stainless steel hospital instrument trolley'
    },
    'hospital-medical-furniture/dirty linen/waste trolley': {
      description: 'Hospital waste and soiled linen collection trolley with bag holder frame for infection control compliance.',
      features: ['Bag holder frame design', 'Foot-operated lid mechanism', 'Color-coded waste segregation', 'Stainless steel construction', 'Easy-maneuver castor system'],
      specifications: ['Capacity: 60-100 litre', 'Material: SS 304 tubular frame', 'Lid: Foot-operated flip top', 'Wheels: 100mm swivel castors', 'Dimensions: 500 x 500 x 900mm'],
      applications: ['Hospital Wards', 'Operating Theaters', 'CSSD Departments', 'Waste Management'],
      altPrefix: 'Hospital waste linen trolley'
    },
    'hospital-medical-furniture/anesthesia cart/trolley': {
      description: 'Multi-drawer anesthesia workstation trolley for organized storage and quick access to anesthesia supplies during procedures.',
      features: ['Multiple lockable drawers', 'Defibrillator shelf on top', 'IV pole bracket integrated', 'Push handle with bumper', 'Central locking system'],
      specifications: ['Drawers: 5-7 varying depth drawers', 'Material: ABS/Steel construction', 'Top: Flat work surface with guard rail', 'Dimensions: 700 x 480 x 950mm', 'Wheels: 125mm antistatic castors'],
      applications: ['Operating Theaters', 'Anesthesia Departments', 'ICU', 'Emergency Rooms'],
      altPrefix: 'Anesthesia cart workstation trolley'
    },
    'hospital-medical-furniture/stretchers': {
      description: 'Patient transport stretcher trolley with adjustable height, side rails, and oxygen cylinder holder for safe intra-hospital transfer.',
      features: ['Adjustable backrest section', 'Collapsible side safety rails', 'Under-carriage storage basket', 'Oxygen cylinder holder bracket', 'Four-wheel central locking system'],
      specifications: ['Platform: 2000 x 560mm perforated', 'Height: 500-800mm adjustable', 'Weight Capacity: 200 kg', 'Side Rails: Drop-down type', 'Wheels: 150mm TPR castors'],
      applications: ['Emergency Departments', 'Patient Transport', 'Pre-Op Holding', 'Recovery Areas'],
      altPrefix: 'Hospital patient stretcher trolley'
    },
    'hospital-medical-furniture/revolving stools': {
      description: 'Height-adjustable revolving stool with chrome base for medical staff seating in clinics and operating rooms.',
      features: ['360-degree revolving seat', 'Gas spring height adjustment', 'Chrome five-star base', 'Cushioned seat top', 'Nylon castor wheels'],
      specifications: ['Seat Diameter: 350mm cushioned', 'Height Range: 450-650mm adjustable', 'Base: Chrome five-star nylon', 'Mechanism: Gas spring lift', 'Wheels: 50mm nylon castors'],
      applications: ['Operating Theaters', 'Laboratories', 'Dental Clinics', 'Examination Rooms'],
      altPrefix: 'Medical revolving stool'
    },
    'hospital-medical-furniture/blood donor chairs': {
      description: 'Ergonomic blood donation chair with adjustable armrest and reclining backrest for comfortable blood collection procedures.',
      features: ['Reclining backrest mechanism', 'Adjustable padded armrest', 'Leg-rest elevation section', 'Washable vinyl upholstery', 'Side tray for equipment'],
      specifications: ['Dimensions: 1800 x 600 x 450-750mm', 'Backrest: 0-160 degree recline', 'Armrest: Adjustable width and height', 'Upholstery: Washable medical vinyl', 'Frame: MS tubular powder coated'],
      applications: ['Blood Banks', 'Blood Donation Camps', 'Transfusion Centers', 'Pathology Labs'],
      altPrefix: 'Blood donor reclining chair'
    },
    'hospital-medical-furniture/bowl stands': {
      description: 'Stainless steel bowl stand with single or double bowl configuration for surgical scrub and instrument washing.',
      features: ['Polished stainless steel bowl', 'Adjustable height stand', 'Stable tripod or four-leg base', 'Easy-clean smooth finish', 'Available in single/double configuration'],
      specifications: ['Bowl Diameter: 300mm SS 304', 'Height: 800-1000mm adjustable', 'Base: Tripod with castors', 'Material: Stainless Steel 304', 'Bowl Capacity: 5 litre'],
      applications: ['Operating Theaters', 'Surgical Scrub Areas', 'Dressing Rooms', 'Minor Procedure Rooms'],
      altPrefix: 'Stainless steel surgical bowl stand'
    },
    'hospital-medical-furniture/medical cabinets cupboards': {
      description: 'Glass-fronted medical instrument and supply storage cabinet for organized clinical inventory management.',
      features: ['Tempered glass doors with lock', 'Adjustable internal shelves', 'Stainless steel or MS construction', 'Wall-mounted or floor-standing options', 'Dust-proof sealed design'],
      specifications: ['Dimensions: 600 x 300 x 900mm (varies)', 'Doors: Tempered glass / solid steel', 'Shelves: 3-5 adjustable height', 'Material: SS 304 or MS powder coated', 'Lock: Cam lock with key'],
      applications: ['Nursing Stations', 'Procedure Rooms', 'Pharmacies', 'Supply Storage Areas'],
      altPrefix: 'Medical instrument storage cabinet'
    },
    'hospital-medical-furniture/doctor chair & stools': {
      description: 'Ergonomic doctor consultation chair with lumbar support and adjustable armrests for prolonged clinical seating comfort.',
      features: ['High-back ergonomic design', 'Adjustable lumbar support', 'Padded armrests', 'Gas lift height adjustment', 'Tilt and recline mechanism'],
      specifications: ['Seat Height: 420-540mm adjustable', 'Back Height: 600mm', 'Material: PU leather / mesh', 'Base: Chrome five-star nylon castor', 'Weight Capacity: 120 kg'],
      applications: ['Doctor Consultation Rooms', 'OPD Clinics', 'Diagnostic Centers', 'Administrative Offices'],
      altPrefix: 'Doctor ergonomic consultation chair'
    },
    'hospital-medical-furniture/dust bin foot operated': {
      description: 'Foot-operated pedal waste bin for hands-free disposal of clinical waste compliant with bio-medical waste management.',
      features: ['Foot-operated pedal mechanism', 'Self-closing lid design', 'Color-coded for waste segregation', 'Stainless steel construction', 'Inner removable bucket'],
      specifications: ['Capacity: 12 / 20 / 40 litre options', 'Material: SS 304 grade', 'Lid: Self-closing foot pedal', 'Inner Container: Removable SS bucket', 'Finish: Mirror polished'],
      applications: ['Hospital Wards', 'Operating Theaters', 'Laboratories', 'Clinical Areas'],
      altPrefix: 'Foot operated medical waste bin'
    },
    'hospital-medical-furniture/scrub unit racks': {
      description: 'Surgical scrub station with sensor-operated taps and elbow-operated soap dispensers for pre-operative hand hygiene.',
      features: ['Sensor or elbow-operated water taps', 'Elbow-operated soap dispenser', 'Splash guard panel', 'Stainless steel construction', 'Single, double, or triple bay options'],
      specifications: ['Bays: 1, 2, or 3 scrub stations', 'Material: SS 304 grade construction', 'Taps: Sensor / knee / elbow operated', 'Dimensions: 600mm per bay width', 'Mounting: Floor standing with plumbing'],
      applications: ['Operating Theater Entry', 'CSSD', 'Catheterization Labs', 'Clean Room Entry'],
      altPrefix: 'Surgical scrub station unit'
    },
    'hospital-medical-furniture/waiting chairs & benches': {
      description: 'Multi-seat waiting area bench and visitor chairs for hospital lobbies, OPD areas, and clinic reception spaces.',
      features: ['Linked multi-seat configuration', 'Perforated or cushioned seat options', 'Powder-coated steel frame', 'Floor mounting brackets', 'Armrest options available'],
      specifications: ['Seats: 2, 3, 4, or 5 per unit', 'Seat Material: Perforated MS / cushioned', 'Frame: MS tubular powder coated', 'Dimensions: 520mm per seat width', 'Weight Capacity: 120 kg per seat'],
      applications: ['Hospital Lobbies', 'OPD Waiting Areas', 'Clinic Reception', 'Diagnostic Center Lobbies'],
      altPrefix: 'Hospital waiting area bench chairs'
    },
    'hospital-medical-furniture/movable cabinets drawers': {
      description: 'Mobile storage cabinet with multiple drawers for clinical supplies, medications, and instruments in healthcare settings.',
      features: ['Multiple drawer configuration', 'Central locking system', 'Bump-proof castor wheels', 'ABS or steel construction', 'Modular drawer sizes'],
      specifications: ['Drawers: 3-7 drawers varying depth', 'Material: ABS/Steel composite', 'Dimensions: 600 x 450 x 900mm', 'Wheels: 75mm antistatic castors', 'Lock: Central locking with key'],
      applications: ['Nursing Stations', 'Operating Theaters', 'Emergency Departments', 'Ward Utility Rooms'],
      altPrefix: 'Mobile clinical storage cabinet'
    },
    'hospital-medical-furniture/conference/coffee tables': {
      description: 'Hospital and clinic conference room table for administrative meetings and staff areas.',
      features: ['Laminated wood or SS top', 'Sturdy frame construction', 'Multiple size options', 'Cable management option', 'Durable commercial finish'],
      specifications: ['Dimensions: Various sizes available', 'Top: 25mm laminated MDF/SS', 'Frame: MS tubular powder coated', 'Edge: PVC edge banding', 'Weight Capacity: 80 kg'],
      applications: ['Hospital Conference Rooms', 'Staff Common Rooms', 'Administrative Areas', 'Doctor Lounges'],
      altPrefix: 'Hospital conference table'
    },
    'hospital-medical-furniture/stretcher trolley': {
      description: 'Emergency patient stretcher trolley with foldable design for ambulance loading and rapid patient transport.',
      features: ['Foldable X-frame mechanism', 'Adjustable height positions', 'Self-loading ambulance compatibility', 'Restraint strap system', 'Lightweight aluminum frame'],
      specifications: ['Platform: 1900 x 550mm', 'Height: Multiple position adjustment', 'Frame: Aluminum alloy', 'Weight Capacity: 180 kg', 'Folded Size: Compact for storage'],
      applications: ['Ambulance Services', 'Emergency Transport', 'Disaster Response', 'Inter-Hospital Transfer'],
      altPrefix: 'Emergency stretcher trolley foldable'
    },
    'hospital-medical-furniture/ambulance stretcher': {
      description: 'Ambulance-compatible patient transport stretcher with automatic loading system and multi-level height adjustment.',
      features: ['Auto-load mechanism for ambulance', 'Multi-level height adjustment', 'Backrest elevation capability', 'Safety restraint belts', 'Compact fold-down design'],
      specifications: ['Platform: 1900 x 550mm padded', 'Height Levels: 3-4 position', 'Material: Aluminum / steel frame', 'Weight Capacity: 180 kg', 'Certifications: Ambulance loading compatible'],
      applications: ['Ambulance Services', 'Emergency Response', 'Air Ambulance', 'Patient Transport'],
      altPrefix: 'Ambulance auto-load stretcher'
    },
    'hospital-medical-furniture/home care beds': {
      description: 'Home-use medical care bed with manual or electric adjustment for patient rehabilitation and long-term home healthcare.',
      features: ['Manual or electric positioning', 'Compact residential design', 'Detachable side safety rails', 'Quiet motor operation', 'Easy assembly and disassembly'],
      specifications: ['Dimensions: 2000 x 900 x 450-700mm', 'Sections: Two or three section platform', 'Motor: Low-noise electric actuator', 'Weight Capacity: 180 kg', 'Power: 220V AC household'],
      applications: ['Home Healthcare', 'Elderly Care', 'Post-Surgical Recovery', 'Chronic Care Management'],
      altPrefix: 'Home care medical bed'
    },
  };

  // ── Orthopaedic Implants ──
  const orthoMeta: Record<string, SubcategoryMeta> = {
    'orthopaedic-implants/interlocking nails': { description: 'Titanium and stainless steel interlocking intramedullary nails for closed reduction and fixation of long bone fractures.', features: ['Cannulated design for guided insertion', 'Proximal and distal locking holes', 'Available in multiple diameters and lengths', 'Self-tapping option available', 'Compatible with standard locking screws'], specifications: ['Material: Ti-6Al-4V / SS 316L', 'Diameters: 8-14mm', 'Lengths: 240-440mm', 'Locking: Proximal 2 + Distal 2 holes', 'Surface: Electropolished'], applications: ['Femoral Fractures', 'Tibial Fractures', 'Humeral Fractures', 'Trauma Surgery'], altPrefix: 'Interlocking intramedullary nail implant' },
    'orthopaedic-implants/nails wires & pins': { description: 'Orthopaedic K-wires, Steinmann pins, and bone nails for temporary and definitive fracture fixation.', features: ['Precision ground trocar points', 'Available threaded and smooth', 'Multiple diameter options', 'Stainless steel surgical grade', 'Sterile individual packaging'], specifications: ['Material: SS 316L surgical grade', 'K-Wire Diameters: 0.8-3.0mm', 'Pin Diameters: 2.5-6.0mm', 'Lengths: 150-300mm', 'Point: Trocar / Diamond / Bayonet'], applications: ['Fracture Fixation', 'Wire Guided Surgery', 'Skeletal Traction', 'Temporary Stabilization'], altPrefix: 'Orthopaedic K-wire and bone pin' },
    'orthopaedic-implants/mini fragment implants': { description: 'Mini fragment bone plate and screw systems for fixation of small bone fractures in hand, foot, and maxillofacial surgery.', features: ['Low-profile plate design', 'Self-tapping cortex screws', 'Anatomically contoured plates', 'T, L, Y plate configurations', 'Titanium and SS options'], specifications: ['Screw Diameter: 1.5-2.7mm', 'Plate Thickness: 0.6-1.0mm', 'Material: Ti / SS 316L', 'Screw Lengths: 6-30mm', 'Plate Holes: 2-12 hole options'], applications: ['Hand Surgery', 'Foot Surgery', 'Maxillofacial Reconstruction', 'Pediatric Orthopaedics'], altPrefix: 'Mini fragment bone plate system' },
    'orthopaedic-implants/small fragment standard': { description: 'Standard small fragment bone plate and screw system for fixation of fractures in forearm, ankle, and smaller long bones.', features: ['DCP and LC-DCP plate options', 'Cortex and cancellous screws', 'Limited contact design', 'Reconstruction plate variants', 'One-third tubular plates included'], specifications: ['Screw Diameter: 3.5mm cortex / 4.0mm cancellous', 'Plate Width: 10-12mm', 'Material: SS 316L', 'Screw Lengths: 10-60mm', 'Plate Types: DCP, LC-DCP, Recon, Tubular'], applications: ['Forearm Fractures', 'Ankle Fractures', 'Clavicle Fixation', 'Olecranon Fractures'], altPrefix: 'Small fragment bone plate screw system' },
    'orthopaedic-implants/small fragment locking': { description: 'Locking compression plate system for small fragment fractures providing angular stability without periosteal compression.', features: ['Threaded locking screw heads', 'Combination holes for locking and conventional screws', 'Angular stable fixation', 'Minimally invasive insertion capable', 'Pre-contoured anatomical plates'], specifications: ['Screw Diameter: 3.5mm locking head', 'Plate Width: 10-12mm', 'Material: Ti-6Al-4V / SS 316L', 'Angular Stability: Fixed angle construct', 'Plate Types: LCP, anatomical, periarticular'], applications: ['Periarticular Fractures', 'Osteoporotic Bone Fixation', 'Comminuted Fractures', 'Bridge Plating'], altPrefix: 'Small fragment locking compression plate' },
    'orthopaedic-implants/large fragment standard': { description: 'Large fragment DCP bone plate and screw system for fixation of femoral, tibial, and humeral shaft fractures.', features: ['Broad and narrow plate options', 'Cortex and cancellous screws', 'DCP compression principle', 'Reconstruction bendable plates', 'Stainless steel surgical grade'], specifications: ['Screw Diameter: 4.5mm cortex / 6.5mm cancellous', 'Plate Width: 16-18mm', 'Material: SS 316L', 'Screw Lengths: 14-110mm', 'Plate Types: Broad DCP, Narrow DCP, Recon'], applications: ['Femoral Fractures', 'Tibial Shaft Fractures', 'Humeral Fractures', 'Pelvic Fixation'], altPrefix: 'Large fragment DCP bone plate' },
    'orthopaedic-implants/large fragment locking': { description: 'Large fragment locking compression plate providing angular stability for complex fractures in weight-bearing bones.', features: ['Locking head screw technology', 'Combination locking/compression holes', 'Anatomical pre-contoured options', 'Minimally invasive capability', 'Periarticular plate designs'], specifications: ['Screw Diameter: 5.0mm locking head', 'Plate Width: 16-18mm', 'Material: Ti-6Al-4V / SS 316L', 'Angular Stability: Fixed-angle construct', 'Plate Types: LCP broad, narrow, periarticular'], applications: ['Proximal Femur', 'Distal Femur', 'Proximal Tibia', 'Complex Fracture Patterns'], altPrefix: 'Large fragment locking plate system' },
    'orthopaedic-implants/cable plate system': { description: 'Cable and plate fixation system for periprosthetic fractures and trochanteric fixation using cerclage wire technique.', features: ['Multifilament cable design', 'Cable tensioning instrument', 'Plate with cable pass-through holes', 'Crimp locking mechanism', 'Compatible with standard plates'], specifications: ['Cable: Multifilament SS / Ti', 'Cable Diameter: 1.0-2.0mm', 'Tensioner: Calibrated force application', 'Crimp: Deformable locking sleeve', 'Material: SS 316L / Ti alloy'], applications: ['Periprosthetic Fractures', 'Trochanteric Fixation', 'Revision Hip Surgery', 'Cable Cerclage Fixation'], altPrefix: 'Orthopaedic cable plate fixation system' },
    'orthopaedic-implants/craniomaxillofacial implants': { description: 'Titanium mesh, plates, and screws for craniomaxillofacial reconstruction and cranial defect repair.', features: ['Ultra-thin titanium plates', 'Self-drilling screws', 'Titanium mesh for cranial repair', 'Anatomically pre-shaped options', 'MRI compatible'], specifications: ['Screw Diameter: 1.2-2.0mm self-drilling', 'Plate Thickness: 0.4-0.6mm', 'Material: CP Titanium Grade 2', 'Mesh: Titanium grade 1', 'Screw Lengths: 3-7mm'], applications: ['Cranial Reconstruction', 'Mandibular Fractures', 'Midface Fixation', 'Orbital Floor Repair'], altPrefix: 'Craniomaxillofacial titanium plate implant' },
    'orthopaedic-implants/hip prosthesis': { description: 'Total and partial hip replacement prosthesis systems including femoral stems, acetabular cups, and femoral heads.', features: ['Cemented and cementless stem options', 'Modular femoral head sizes', 'UHMWPE acetabular liner', 'Porous coated ingrowth surface', 'Anatomical offset options'], specifications: ['Stem: CoCr / Ti alloy', 'Head: CoCr 28/32/36mm diameter', 'Cup: UHMWPE / metal backing', 'Stem Sizes: 8-18mm', 'Surface: HA coated / porous coated'], applications: ['Total Hip Arthroplasty', 'Hemiarthroplasty', 'Hip Fracture Treatment', 'Revision Hip Surgery'], altPrefix: 'Hip replacement prosthesis system' },
    'orthopaedic-implants/external fixators': { description: 'External fixation systems with pins, clamps, and connecting rods for open fracture management and limb reconstruction.', features: ['Carbon fiber or steel connecting rods', 'Universal clamp system', 'Schanz pin and half-pin options', 'Ring fixator configurations', 'Adjustable reduction capability'], specifications: ['Pins: 4-6mm Schanz self-drilling', 'Rods: Carbon fiber / SS 6-11mm', 'Clamps: Universal single/double', 'Ring Size: 100-220mm diameter', 'Material: SS 316L / carbon composite'], applications: ['Open Fracture Management', 'Limb Lengthening', 'Ilizarov Technique', 'Damage Control Orthopaedics'], altPrefix: 'External fixator system with clamps' },
    'orthopaedic-implants/general instruments': { description: 'Orthopaedic surgical instruments including bone reduction clamps, plate benders, screw drivers, and depth gauges.', features: ['Precision-machined instrument tips', 'Ergonomic handle design', 'Autoclave-safe construction', 'Color-coded size identification', 'Modular quick-connect handles'], specifications: ['Material: SS 420 / 410 surgical grade', 'Screwdriver: Hexagonal / cruciform tips', 'Depth Gauge: 0-110mm calibrated', 'Drill Bits: 2.0-4.5mm SS/HSS', 'Finish: Satin / mirror polished'], applications: ['Fracture Surgery', 'Implant Insertion', 'Plate Contouring', 'Screw Removal'], altPrefix: 'Orthopaedic surgical instrument set' },
    'orthopaedic-implants/surgical power tools': { description: 'Battery and pneumatic powered surgical drill and saw systems for orthopaedic procedures.', features: ['Battery-operated cordless system', 'Autoclavable handpiece', 'Variable speed control', 'Quick-connect chuck system', 'Oscillating and reciprocating options'], specifications: ['Motor Speed: 0-1200 RPM variable', 'Battery: Li-ion rechargeable', 'Torque: 2.5 Nm maximum', 'Chuck: Quick-connect keyless', 'Sterilization: Autoclave 134°C compatible'], applications: ['Joint Replacement Surgery', 'Fracture Fixation', 'Spine Surgery', 'Maxillofacial Surgery'], altPrefix: 'Orthopaedic surgical power drill' },
    'orthopaedic-implants/dhs/dcs & angled blade': { description: 'Dynamic Hip Screw, Dynamic Condylar Screw, and angled blade plate systems for proximal femur and distal femur fractures.', features: ['Sliding compression screw mechanism', 'Barrel plate with multiple hole options', 'DCS for condylar fractures', 'Angled blade plate for subtrochanteric', 'Lag screw with self-cutting tip'], specifications: ['DHS Screw: 12.5mm diameter', 'Barrel Angle: 130-150 degrees', 'Plate Length: 2-16 hole options', 'Blade Length: 40-90mm', 'Material: SS 316L'], applications: ['Intertrochanteric Fractures', 'Subtrochanteric Fractures', 'Distal Femur Fractures', 'Supracondylar Fractures'], altPrefix: 'DHS dynamic hip screw plate' },
    'orthopaedic-implants/headless compression screws': { description: 'Headless compression screws for intra-articular fracture fixation with fully threaded design for compression across fragments.', features: ['Headless fully buried design', 'Differential pitch compression', 'Self-drilling and self-tapping', 'Cannulated for K-wire guidance', 'Titanium and SS options'], specifications: ['Diameter: 2.5-7.3mm', 'Lengths: 10-75mm', 'Material: Ti / SS 316L', 'Thread: Full or partial thread', 'Drive: Hexagonal or star drive'], applications: ['Scaphoid Fractures', 'Metatarsal Fractures', 'Osteotomy Fixation', 'Small Joint Arthrodesis'], altPrefix: 'Headless compression screw implant' },
    'orthopaedic-implants/spine surgery': { description: 'Spinal fixation systems including pedicle screws, rods, cages, and hooks for vertebral stabilization.', features: ['Polyaxial pedicle screw heads', 'Pre-contoured titanium rods', 'PEEK interbody cages', 'Top-loading screw design', 'Reduction and compression tools'], specifications: ['Screw Diameter: 4.5-8.5mm', 'Screw Length: 25-55mm', 'Rod Diameter: 5.5-6.0mm Ti', 'Cage Material: PEEK / Ti mesh', 'Pedicle Screw: Polyaxial ±30°'], applications: ['Spinal Fusion', 'Degenerative Disc Disease', 'Spinal Trauma', 'Scoliosis Correction'], altPrefix: 'Spinal pedicle screw fixation system' },
    'orthopaedic-implants/veterinary implants': { description: 'Veterinary-specific orthopaedic implants including bone plates, screws, and intramedullary pins for animal fracture surgery.', features: ['Sized for animal anatomy', 'Veterinary plate configurations', 'Mini to large fragment range', 'Compatible with vet instruments', 'Stainless steel surgical grade'], specifications: ['Screw Diameters: 1.5-4.5mm', 'Plate Sizes: Mini to broad', 'Material: SS 316L', 'Pin Diameters: 1.5-4.0mm', 'Applications: Canine, feline, equine'], applications: ['Veterinary Fracture Surgery', 'Canine Orthopaedics', 'Equine Surgery', 'Animal Trauma Care'], altPrefix: 'Veterinary orthopaedic bone plate implant' },
  };

  // Merge all maps
  const allMeta = { ...metaMap, ...orthoMeta };

  const found = allMeta[key];
  if (found) return found;

  return getSubcategoryMetadata(categorySlug, subName);
}

// ─── Raw category data ───────────────────────────────────────────

const rawCategoriesData = [
  {
    name: 'Hospital Medical Furniture',
    slug: 'hospital-medical-furniture',
    description: 'Premium medical furniture designed for patient comfort, durability, and clinical efficiency across hospital wards, ICU, and OPD settings.',
    subcategories: [
      'ICU Beds', 'Fowler Beds', 'Semi Fowler Beds', 'Plain Hospital Beds', 'Orthopaedic Beds', 'Baby Crib', 'Hospital Beds Mattress', 'Bedside Cabinets', 'Bedside Screens', 'Overbed Tables', 'IV Pole Saline Stands', 'Examination Table', 'Obstetric Tables', 'Foot Stools', 'Trolley', 'Dirty Linen/Waste Trolley', 'Anesthesia Cart/Trolley', 'Stretchers', 'Revolving Stools', 'Blood Donor Chairs', 'Bowl Stands', 'Medical Cabinets Cupboards', 'Doctor Chair & Stools', 'Dust Bin Foot Operated', 'Scrub Unit Racks', 'Waiting Chairs & Benches', 'Movable Cabinets Drawers', 'Conference/Coffee Tables', 'Stretcher Trolley', 'Ambulance Stretcher', 'Home Care Beds'
    ]
  },
  {
    name: 'Orthopaedic Implants',
    slug: 'orthopaedic-implants',
    description: 'High-quality orthopaedic implants and instruments for surgical procedures, fracture fixation, and skeletal reconstruction.',
    subcategories: [
      'Interlocking Nails', 'Nails Wires & Pins', 'Mini Fragment Implants', 'Small Fragment Standard', 'Small Fragment Locking', 'Large Fragment Standard', 'Large Fragment Locking', 'Cable Plate System', 'Craniomaxillofacial Implants', 'Hip Prosthesis', 'External Fixators', 'General Instruments', 'Surgical Power Tools', 'DHS/DCS & Angled Blade', 'Headless Compression Screws', 'Spine Surgery', 'Veterinary Implants'
    ]
  },
  {
    name: 'General Surgical Instruments',
    slug: 'general-surgical-instruments',
    description: 'Precision-crafted general surgical instruments manufactured from surgical-grade stainless steel for various medical procedures.',
    subcategories: [
      'Surgical Scissors', 'Forceps', 'Needle Holders', 'Retractors', 'Towel Clips', 'Surgical Elevators', 'Dissectors', 'Bone Curette', 'Bone Rasps', 'Bone Mallets', 'Clamps', 'Bone Chisel & Gouges', 'Rongeurs', 'Wire Cutters', 'Osteotomes', 'Surgical Instruments Set'
    ]
  },
  {
    name: 'Medical Disposables',
    slug: 'medical-disposables',
    description: 'Single-use medical disposable products ensuring hygiene, cross-contamination prevention, and safety in healthcare settings.',
    subcategories: [
      'Cardiology Disposables', 'Infusion Products', 'Surgical Gloves', 'Urology Disposables', 'Anaesthesia Disposables', 'General Surgery', 'Gynaecology Disposables', 'Non Woven Products', 'Surgical Blades & Scalpels', 'Blood Collection Tubes', 'Surgical Dressings', 'Laryngeal Mask', 'ECG Electrodes', 'Blood Bag Systems'
    ]
  },
  {
    name: 'Diagnostic Equipments',
    slug: 'diagnostic-equipments',
    description: 'Accurate and reliable diagnostic equipment for patient monitoring, vital signs assessment, and clinical examination.',
    subcategories: [
      'Sphygmomanometers', 'Stethoscopes', 'Otoscopes', 'Ophthalmoscopes', 'Pulse Oximeters', 'ECG Machine', 'Digital BP Monitor', 'Nebulizers', 'Thermometers', 'Fetal Doppler'
    ]
  },
  {
    name: 'Anaesthesia Products',
    slug: 'anaesthesia-products',
    description: 'Comprehensive range of anaesthesia delivery, airway management, and respiratory support products.',
    subcategories: [
      'Breathing Circuit', 'Anaesthesia Disposables', 'Ambu Bags', 'Face Masks', 'Reservoir Bags', 'Guedel Airway', 'Anesthesia Machine', 'Oxygen Cylinder'
    ]
  },
  {
    name: 'Autoclave & Sterilizers',
    slug: 'autoclave-sterilizers',
    description: 'Advanced sterilization equipment for maintaining a sterile clinical environment and instrument reprocessing.',
    subcategories: [
      'Pressure Steam Sterilizers', 'Horizontal Autoclave', 'Vertical Autoclave', 'Flash Sterilizers', 'Dressing Drums', 'Hot Air Sterilizers', 'Instrument Sterilizers'
    ]
  },
  {
    name: 'Laboratory Products',
    slug: 'laboratory-products',
    description: 'Precision laboratory equipment and instruments for clinical testing, analysis, and research.',
    subcategories: [
      'Clinical Lab Devices', 'Centrifuge', 'Hot Plates', 'Incubator', 'Water Bath', 'Microscopes', 'Hot Air Oven', 'Micropipettes', 'Microtome'
    ]
  },
  {
    name: 'Height & Weight Scales',
    slug: 'height-weight-scales',
    description: 'Accurate measurement scales for height, weight, and BMI assessment in healthcare and fitness settings.',
    subcategories: [
      'Adult Weighing Scales', 'Baby Weighing Scales', 'Height Measuring Stands', 'BMI Scales'
    ]
  },
  {
    name: 'OB GYN Products',
    slug: 'ob-gyn-products',
    description: 'Specialized instruments and equipment for obstetrics and gynaecology clinical procedures.',
    subcategories: [
      'Vacuum Extractor', 'Obstetric Forceps', 'IUD Instruments', 'Vaginal Speculum'
    ]
  },
  {
    name: 'OT & Examination Lights',
    slug: 'ot-examination-lights',
    description: 'High-intensity LED illumination systems for operating theaters, examination rooms, and minor procedure areas.',
    subcategories: [
      'LED OT Lights', 'Examination Lights', 'Mobile OT Lights', 'Ceiling OT Lights'
    ]
  },
  {
    name: 'Suction Machines & Units',
    slug: 'suction-machines',
    description: 'Reliable medical suction devices for surgical field clearance, airway management, and fluid aspiration.',
    subcategories: [
      'Portable Suction', 'Electric Suction', 'Manual Suction', 'Suction Accessories'
    ]
  },
  {
    name: 'Medical Rubber Products',
    slug: 'medical-rubber-products',
    description: 'Durable medical-grade rubber products for patient comfort, therapy, and clinical support applications.',
    subcategories: [
      'Hot Water Bottle', 'Ice Bags', 'Air Cushion', 'Rubber Sheets'
    ]
  },
  {
    name: 'Hospital Holloware',
    slug: 'hospital-holloware',
    description: 'Stainless steel holloware for clinical, surgical, and patient care applications in hospital environments.',
    subcategories: [
      'Kidney Trays', 'Bowls', 'Bed Pans', 'Urinals', 'Gallipots', 'Dressing Jars'
    ]
  },
  {
    name: 'Infant Care Equipments',
    slug: 'infant-care-equipments',
    description: 'Specialized life-saving and nurturing equipment for neonatal intensive care and pediatric departments.',
    subcategories: [
      'Baby Warmers', 'Phototherapy Units', 'Baby Incubator', 'Infant Resuscitator'
    ]
  },
  {
    name: 'Laryngoscope Set & Spares',
    slug: 'laryngoscope-sets',
    description: 'High-quality intubation devices including fiber optic and conventional laryngoscope systems with spare components.',
    subcategories: [
      'Fiber Optic Laryngoscope', 'Conventional Laryngoscope', 'Laryngoscope Blades', 'Spare Bulbs'
    ]
  },
  {
    name: 'Cold Chain Equipments',
    slug: 'cold-chain-equipments',
    description: 'Reliable cold storage and transport solutions for vaccines, blood products, and temperature-sensitive medical supplies.',
    subcategories: [
      'Ice Lined Refrigerators', 'Vaccine Carriers', 'Cold Boxes', 'Freezer Indicators'
    ]
  },
  {
    name: 'Emergency Products',
    slug: 'emergency-products',
    description: 'Critical life-saving equipment and trauma supplies for emergency medical response and first aid.',
    subcategories: [
      'First Aid Kits', 'Emergency Stretchers', 'Resuscitation Kits', 'Spine Boards'
    ]
  },
  {
    name: 'Misc. Surgical Medical Products',
    slug: 'misc-surgical-products',
    description: 'Essential surgical and medical accessories for clinical use across various healthcare departments.',
    subcategories: [
      'Tourniquets', 'Pen Torches', 'Surgical Markers', 'Head Lamps'
    ]
  },
  {
    name: 'Hospital Scrubs & Linens',
    slug: 'hospital-scrubs-linens',
    description: 'Comfortable, hygienic medical apparel and hospital linens for staff and patient use.',
    subcategories: [
      'Surgeon Gowns', 'Patient Gowns', 'Hospital Bed Sheets', 'Surgical Drapes'
    ]
  },
  {
    name: 'OT Tables',
    slug: 'ot-tables',
    description: 'Advanced operating tables with versatile patient positioning capabilities for complex surgical procedures.',
    subcategories: [
      'Manual OT Tables', 'Hydraulic OT Tables', 'Electric OT Tables', 'C-Arm Compatible Tables'
    ]
  },
  {
    name: 'Rehabilitation Products & Aids',
    slug: 'rehabilitation-products',
    description: 'Supportive mobility aids and rehabilitation products for patient recovery, physiotherapy, and daily living assistance.',
    subcategories: [
      'Wheelchairs', 'Walking Aids', 'Cervical Collars', 'Splints & Supports'
    ]
  },
  {
    name: 'Dental Equipments',
    slug: 'dental-equipments',
    description: 'Professional dental chairs, instruments, handpieces, and imaging solutions for modern dental clinics.',
    subcategories: [
      'Dental Chairs', 'Dental Instruments', 'Dental Handpieces', 'Dental X-Ray'
    ]
  },
  {
    name: 'Blood Collection Tubes',
    slug: 'blood-collection-tubes',
    description: 'Standardized vacuum blood collection tubes with various anticoagulants for safe and reliable blood sampling.',
    subcategories: [
      'EDTA Tubes', 'Plain Tubes', 'Fluoride Tubes', 'Citrate Tubes'
    ]
  },
  {
    name: 'Medical Imaging',
    slug: 'medical-imaging',
    description: 'Diagnostic imaging systems for precise medical visualization including X-ray, ultrasound, and fluoroscopy.',
    subcategories: [
      'X-Ray Machines', 'Ultrasound', 'C-Arm Systems', 'Digital Radiography'
    ]
  },
  {
    name: 'ICU Equipment',
    slug: 'icu-equipment',
    description: 'Advanced life support and patient monitoring systems for intensive care unit management.',
    subcategories: [
      'Patient Monitors', 'Ventilators', 'Infusion Pumps', 'Defibrillators'
    ]
  },
  {
    name: 'OT Equipment',
    slug: 'ot-equipment',
    description: 'Critical support equipment and integration systems for modern operating theater management.',
    subcategories: [
      'Electrosurgical Units', 'OT Pendants', 'Surgical Cameras', 'OT Control Panels'
    ]
  },
  {
    name: 'Physiotherapy Equipments',
    slug: 'physiotherapy-equipments',
    description: 'Therapeutic modalities and exercise equipment for physical rehabilitation and pain management.',
    subcategories: [
      'Ultrasonic Therapy', 'TENS Units', 'Short Wave Diathermy', 'Traction Units'
    ]
  },
  {
    name: 'Radiation Protection Lead Apparels',
    slug: 'radiation-protection',
    description: 'Protective lead-equivalence shielding apparel for safe radiology and interventional procedures.',
    subcategories: [
      'Lead Aprons', 'Thyroid Collars', 'Lead Glasses', 'Lead Gloves'
    ]
  },
  {
    name: 'Covid-19 Products',
    slug: 'covid-19-products',
    description: 'Essential personal protective equipment and infection control supplies for pandemic preparedness.',
    subcategories: [
      'PPE Kits', 'Face Shields', 'N95 Masks', 'Sanitizers & Disinfectants'
    ]
  },
  {
    name: 'Veterinary Medical Equipment',
    slug: 'veterinary-equipment',
    description: 'Specialized medical and surgical equipment designed for veterinary healthcare and animal surgery.',
    subcategories: [
      'Veterinary Instruments', 'Veterinary Implants', 'Animal Restraints', 'Veterinary Diagnostics'
    ]
  }
];

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

// ─── Generate complete catalog with subcategory-level imagery ────

export const categories: Category[] = rawCategoriesData.map((cat, cIndex) => {
  const catImage = `/images/categories/${cat.slug}.webp`;

  return {
    id: `cat-${cIndex + 1}`,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: catImage,
    subcategories: cat.subcategories.map((sub, sIndex) => {
      const subSlug = generateSlug(sub);
      const meta = getSubcategoryMeta(cat.slug, sub);
      const subImage = `/images/products/${cat.slug}/${subSlug}/hero.webp`;

      // Generate 3 products for each subcategory
      const products: Product[] = [0, 1, 2].map(pIndex => {
        const variants = ['Premium', 'Standard', 'Advanced'];
        const variant = variants[pIndex];
        const randomChar = String.fromCharCode(65 + (pIndex % 26));
        const modelNo = `EK-${(cIndex + 1).toString().padStart(2, '0')}${(sIndex + 1).toString().padStart(2, '0')}${pIndex + 1}${randomChar}`;
        
        const heroPath = `/images/products/${cat.slug}/${subSlug}/hero.webp`;
        const galleryPaths = [
          heroPath,
          `/images/products/${cat.slug}/${subSlug}/front.webp`,
          `/images/products/${cat.slug}/${subSlug}/side.webp`,
        ];

        return {
          id: `prod-${cIndex + 1}-${sIndex + 1}-${pIndex + 1}`,
          name: `${variant} ${sub}`,
          slug: `${subSlug}-${variant.toLowerCase()}`,
          modelNo,
          description: `${variant} ${meta.description}`,
          image: heroPath,
          gallery: galleryPaths,
          media: {
            hero: heroPath,
            gallery: galleryPaths,
            alt: `${variant} ${meta.altPrefix}`,
          },
          leadTime: '7 - 14 Business Days (Global Dispatch)',
          certifications: ['ISO 13485:2016', 'ISO 9001:2015'],
          warranty: '12 Months Comprehensive EKOSYS Warranty',
          specifications: meta.specifications,
          features: meta.features,
          applications: meta.applications,
        };
      });

      return {
        id: `sub-${cIndex + 1}-${sIndex + 1}`,
        name: sub,
        slug: subSlug,
        description: meta.description,
        image: subImage,
        products
      };
    })
  };
});

// ─── Helper Functions ────────────────────────────────────────────

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getSubCategoryBySlug(categorySlug: string, subSlug: string): SubCategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find(s => s.slug === subSlug);
}

export function getAllProducts(): { category: Category; subcategory: SubCategory; product: Product }[] {
  const allProducts: { category: Category; subcategory: SubCategory; product: Product }[] = [];
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.products.forEach(product => {
        allProducts.push({ category, subcategory, product });
      });
    });
  });
  return allProducts;
}

export function getProductBySlug(categorySlug: string, subSlug: string, productSlug: string): { category: Category; subcategory: SubCategory; product: Product } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.subcategories.find(s => s.slug === subSlug);
  if (!subcategory) return undefined;
  const product = subcategory.products.find(p => p.slug === productSlug);
  if (!product) return undefined;
  return { category, subcategory, product };
}

export function searchProducts(query: string): { category: Category; subcategory: SubCategory; product: Product }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return getAllProducts().filter(({ category, subcategory, product }) => 
    product.name.toLowerCase().includes(q) || 
    product.description.toLowerCase().includes(q) ||
    product.modelNo.toLowerCase().includes(q) ||
    subcategory.name.toLowerCase().includes(q) ||
    category.name.toLowerCase().includes(q) ||
    product.applications.some(app => app.toLowerCase().includes(q))
  );
}
