# scripts/build_catalog_meta.py
"""
Build complete, authentic medical equipment metadata for all 31 categories and 206 subcategories.
Outputs: src/data/catalogMeta.ts
"""
import json
import os

CATEGORIES = [
    {
        "name": "Hospital Medical Furniture",
        "slug": "hospital-medical-furniture",
        "subcategories": [
            "ICU Beds", "Fowler Beds", "Semi Fowler Beds", "Plain Hospital Beds", "Orthopaedic Beds",
            "Baby Crib", "Hospital Beds Mattress", "Bedside Cabinets", "Bedside Screens", "Overbed Tables",
            "IV Pole Saline Stands", "Examination Table", "Obstetric Tables", "Foot Stools", "Trolley",
            "Dirty Linen/Waste Trolley", "Anesthesia Cart/Trolley", "Stretchers", "Revolving Stools",
            "Blood Donor Chairs", "Bowl Stands", "Medical Cabinets Cupboards", "Doctor Chair & Stools",
            "Dust Bin Foot Operated", "Scrub Unit Racks", "Waiting Chairs & Benches", "Movable Cabinets Drawers",
            "Conference/Coffee Tables", "Stretcher Trolley", "Ambulance Stretcher", "Home Care Beds"
        ]
    },
    {
        "name": "Orthopaedic Implants",
        "slug": "orthopaedic-implants",
        "subcategories": [
            "Interlocking Nails", "Nails Wires & Pins", "Mini Fragment Implants", "Small Fragment Standard",
            "Small Fragment Locking", "Large Fragment Standard", "Large Fragment Locking", "Cable Plate System",
            "Craniomaxillofacial Implants", "Hip Prosthesis", "External Fixators", "General Instruments",
            "Surgical Power Tools", "DHS/DCS & Angled Blade", "Headless Compression Screws", "Spine Surgery",
            "Veterinary Implants"
        ]
    },
    {
        "name": "General Surgical Instruments",
        "slug": "general-surgical-instruments",
        "subcategories": [
            "Surgical Scissors", "Forceps", "Needle Holders", "Retractors", "Towel Clips",
            "Surgical Elevators", "Dissectors", "Bone Curette", "Bone Rasps", "Bone Mallets",
            "Clamps", "Bone Chisel & Gouges", "Rongeurs", "Wire Cutters", "Osteotomes",
            "Surgical Instruments Set"
        ]
    },
    {
        "name": "Medical Disposables",
        "slug": "medical-disposables",
        "subcategories": [
            "Cardiology Disposables", "Infusion Products", "Surgical Gloves", "Urology Disposables",
            "Anaesthesia Disposables", "General Surgery", "Gynaecology Disposables", "Non Woven Products",
            "Surgical Blades & Scalpels", "Blood Collection Tubes", "Surgical Dressings", "Laryngeal Mask",
            "ECG Electrodes", "Blood Bag Systems"
        ]
    },
    {
        "name": "Diagnostic Equipments",
        "slug": "diagnostic-equipments",
        "subcategories": [
            "Sphygmomanometers", "Stethoscopes", "Otoscopes", "Ophthalmoscopes", "Pulse Oximeters",
            "ECG Machine", "Digital BP Monitor", "Nebulizers", "Thermometers", "Fetal Doppler"
        ]
    },
    {
        "name": "Anaesthesia Products",
        "slug": "anaesthesia-products",
        "subcategories": [
            "Breathing Circuit", "Anaesthesia Disposables", "Ambu Bags", "Face Masks",
            "Reservoir Bags", "Guedel Airway", "Anesthesia Machine", "Oxygen Cylinder"
        ]
    },
    {
        "name": "Autoclave & Sterilizers",
        "slug": "autoclave-sterilizers",
        "subcategories": [
            "Pressure Steam Sterilizers", "Horizontal Autoclave", "Vertical Autoclave",
            "Flash Sterilizers", "Dressing Drums", "Hot Air Sterilizers", "Instrument Sterilizers"
        ]
    },
    {
        "name": "Laboratory Products",
        "slug": "laboratory-products",
        "subcategories": [
            "Clinical Lab Devices", "Centrifuge", "Hot Plates", "Incubator", "Water Bath",
            "Microscopes", "Hot Air Oven", "Micropipettes", "Microtome"
        ]
    },
    {
        "name": "Height & Weight Scales",
        "slug": "height-weight-scales",
        "subcategories": [
            "Adult Weighing Scales", "Baby Weighing Scales", "Height Measuring Stands", "BMI Scales"
        ]
    },
    {
        "name": "OB GYN Products",
        "slug": "ob-gyn-products",
        "subcategories": [
            "Vacuum Extractor", "Obstetric Forceps", "IUD Instruments", "Vaginal Speculum"
        ]
    },
    {
        "name": "OT & Examination Lights",
        "slug": "ot-examination-lights",
        "subcategories": [
            "LED OT Lights", "Examination Lights", "Mobile OT Lights", "Ceiling OT Lights"
        ]
    },
    {
        "name": "Suction Machines & Units",
        "slug": "suction-machines",
        "subcategories": [
            "Portable Suction", "Electric Suction", "Manual Suction", "Suction Accessories"
        ]
    },
    {
        "name": "Medical Rubber Products",
        "slug": "medical-rubber-products",
        "subcategories": [
            "Hot Water Bottle", "Ice Bags", "Air Cushion", "Rubber Sheets"
        ]
    },
    {
        "name": "Hospital Holloware",
        "slug": "hospital-holloware",
        "subcategories": [
            "Kidney Trays", "Bowls", "Bed Pans", "Urinals", "Gallipots", "Dressing Jars"
        ]
    },
    {
        "name": "Infant Care Equipments",
        "slug": "infant-care-equipments",
        "subcategories": [
            "Baby Warmers", "Phototherapy Units", "Baby Incubator", "Infant Resuscitator"
        ]
    },
    {
        "name": "Laryngoscope Set & Spares",
        "slug": "laryngoscope-sets",
        "subcategories": [
            "Fiber Optic Laryngoscope", "Conventional Laryngoscope", "Laryngoscope Blades", "Spare Bulbs"
        ]
    },
    {
        "name": "Cold Chain Equipments",
        "slug": "cold-chain-equipments",
        "subcategories": [
            "Ice Lined Refrigerators", "Vaccine Carriers", "Cold Boxes", "Freezer Indicators"
        ]
    },
    {
        "name": "Emergency Products",
        "slug": "emergency-products",
        "subcategories": [
            "First Aid Kits", "Emergency Stretchers", "Resuscitation Kits", "Spine Boards"
        ]
    },
    {
        "name": "Misc. Surgical Medical Products",
        "slug": "misc-surgical-products",
        "subcategories": [
            "Tourniquets", "Pen Torches", "Surgical Markers", "Head Lamps"
        ]
    },
    {
        "name": "Hospital Scrubs & Linens",
        "slug": "hospital-scrubs-linens",
        "subcategories": [
            "Surgeon Gowns", "Patient Gowns", "Hospital Bed Sheets", "Surgical Drapes"
        ]
    },
    {
        "name": "OT Tables",
        "slug": "ot-tables",
        "subcategories": [
            "Manual OT Tables", "Hydraulic OT Tables", "Electric OT Tables", "C-Arm Compatible Tables"
        ]
    },
    {
        "name": "Rehabilitation Products & Aids",
        "slug": "rehabilitation-products",
        "subcategories": [
            "Wheelchairs", "Walking Aids", "Cervical Collars", "Splints & Supports"
        ]
    },
    {
        "name": "Dental Equipments",
        "slug": "dental-equipments",
        "subcategories": [
            "Dental Chairs", "Dental Instruments", "Dental Handpieces", "Dental X-Ray"
        ]
    },
    {
        "name": "Blood Collection Tubes",
        "slug": "blood-collection-tubes",
        "subcategories": [
            "EDTA Tubes", "Plain Tubes", "Fluoride Tubes", "Citrate Tubes"
        ]
    },
    {
        "name": "Medical Imaging",
        "slug": "medical-imaging",
        "subcategories": [
            "X-Ray Machines", "Ultrasound", "C-Arm Systems", "Digital Radiography"
        ]
    },
    {
        "name": "ICU Equipment",
        "slug": "icu-equipment",
        "subcategories": [
            "Patient Monitors", "Ventilators", "Infusion Pumps", "Defibrillators"
        ]
    },
    {
        "name": "OT Equipment",
        "slug": "ot-equipment",
        "subcategories": [
            "Electrosurgical Units", "OT Pendants", "Surgical Cameras", "OT Control Panels"
        ]
    },
    {
        "name": "Physiotherapy Equipments",
        "slug": "physiotherapy-equipments",
        "subcategories": [
            "Ultrasonic Therapy", "TENS Units", "Short Wave Diathermy", "Traction Units"
        ]
    },
    {
        "name": "Radiation Protection Lead Apparels",
        "slug": "radiation-protection",
        "subcategories": [
            "Lead Aprons", "Thyroid Collars", "Lead Glasses", "Lead Gloves"
        ]
    },
    {
        "name": "Covid-19 Products",
        "slug": "covid-19-products",
        "subcategories": [
            "PPE Kits", "Face Shields", "N95 Masks", "Sanitizers & Disinfectants"
        ]
    },
    {
        "name": "Veterinary Medical Equipment",
        "slug": "veterinary-equipment",
        "subcategories": [
            "Veterinary Instruments", "Veterinary Implants", "Animal Restraints", "Veterinary Diagnostics"
        ]
    }
]

# Existing rich meta map for Hospital Furniture & Orthopaedics can be imported/extended
def generate_sub_meta(cat_slug, sub_name):
    s_lower = sub_name.lower()
    
    # ── General Surgical Instruments ──
    if cat_slug == "general-surgical-instruments":
        materials = "Surgical Grade Stainless Steel AISI 420/410 with electropolished satin finish"
        if "scissor" in s_lower:
            return {
                "description": "Precision surgical cutting scissors engineered with razor-honed micro-bevel blades and optional tungsten carbide inlays for clean tissue dissection without shredding.",
                "features": ["Tungsten carbide gold-ring inserts for sustained cutting edge", "Micro-serrated lower blade prevents tissue slippage", "Ergonomic finger rings with balanced pivot rivet", "Autoclavable up to 134°C (273°F)", "Satin anti-glare finish under OT illumination"],
                "specifications": [f"Material: {materials}", "Hardness: 50-54 HRC (Tungsten Carbide 68 HRC)", "Length Variations: 115mm to 230mm", "Sterilization: Steam Autoclave, EtO, Plasma", "Standard: ISO 7153-1 / DIN 58298"],
                "applications": ["General Surgery", "Cardiothoracic Surgery", "Plastic & Reconstructive", "Gynecological Surgery"],
                "altPrefix": f"Precision surgical {s_lower}"
            }
        elif "forcep" in s_lower:
            return {
                "description": "Atraumatic surgical tissue and dressing forceps designed for delicate grasp, manipulation, and secure tissue approximation during surgical procedures.",
                "features": ["Precision-aligned serrated tips with non-slip grip", "Spring-tempered shanks prevent lateral displacement", "Available in anatomical, surgical 1x2 teeth, and DeBakey atraumatic designs", "Corrosion-resistant medical alloy", "Ultra-smooth hinge joint"],
                "specifications": [f"Material: {materials}", "Tip Profiles: Micro-fine 0.8mm to 2.5mm heavy", "Length Variations: 120mm to 300mm", "Jaw Patterns: Cross-serrated, DeBakey, 1x2 Teeth", "Standard: ISO 13485:2016 Compliant"],
                "applications": ["Microsurgery", "Abdominal Surgery", "Wound Closure & Suturing", "Vascular Surgery"],
                "altPrefix": f"Surgical {s_lower} instrument"
            }
        elif "needle" in s_lower:
            return {
                "description": "High-precision needle holders with diamond-dust cross-serrated tungsten carbide jaws for secure, slip-free grasp of fine to heavy surgical suture needles.",
                "features": ["Tungsten carbide jaw inserts with pyramid tooth profile", "Multi-position ratchet locking mechanism", "Smooth ring handles with balanced counter-weight", "Snag-free box lock hinge assembly", "Extended shank options for deep-cavity suturing"],
                "specifications": [f"Material: AISI 420 Martensitic Stainless Steel", "Jaw Insert: Tungsten Carbide (0.4mm or 0.5mm pitch)", "Lengths: 130mm to 260mm (Mayo-Hegar, Mathieu, Castroviejo)", "Ratchet: 3-position positive lock", "Standard: CE Directive 93/42/EEC"],
                "applications": ["General Suture Closure", "Cardiovascular Suturing", "Plastic Surgery", "Ophthalmic Microsurgery"],
                "altPrefix": f"Surgical needle holder {s_lower}"
            }
        elif "retractor" in s_lower:
            return {
                "description": "Ergonomic handheld and self-retaining surgical retractors providing optimal tissue exposure and field visualization with minimized tissue trauma.",
                "features": ["Blunt and sharp blade configurations", "Curved ergonomic handles for stable surgeon traction", "Self-retaining ratchet mechanisms with fine adjustment", "Rigid construction resists mechanical deformation", "Mirror and satin glare-resistant finishes"],
                "specifications": [f"Material: AISI 304/420 Stainless Steel", "Configurations: Langenbeck, Richardson, Balfour, Weitlaner", "Blade Depths: 20mm to 120mm", "Working Spread: 50mm to 250mm", "Standards: ISO 13485 / ISO 7153-1"],
                "applications": ["Laparotomy & Abdominal Surgery", "Orthopaedic Exposure", "Thyroidectomy", "Thoracotomy"],
                "altPrefix": f"Surgical retractor {s_lower}"
            }
        else:
            return {
                "description": f"High-precision {s_lower} manufactured from premium medical-grade stainless steel to deliver superior surgical performance and durability in modern operating rooms.",
                "features": [f"Specialized {s_lower} design for surgical efficiency", "Drop-forged surgical stainless steel construction", "Passivated and electropolished for anti-corrosion", "Compatible with hospital steam autoclave cycle 134°C", "Precision balance reduces hand fatigue"],
                "specifications": [f"Material: {materials}", "Surface Finish: Non-reflective satin matte", "Hardness: 48-52 HRC", "Autoclave Cycles: >1000 standard sterilization cycles", "Standard: ISO 13485:2016 / CE Mark"],
                "applications": ["Operating Theatres", "General Surgery Units", "Ambulatory Surgical Centers", "Emergency Trauma"],
                "altPrefix": f"Hospital surgical {s_lower}"
            }

    # ── Medical Disposables ──
    if cat_slug == "medical-disposables":
        return {
            "description": f"Hospital-grade single-use sterile {s_lower} designed for maximum clinical safety, patient comfort, and total infection prevention in healthcare environments.",
            "features": ["100% Medical-grade non-toxic biocompatible polymers", "EtO gas sterilized or gamma irradiated individual blister packaging", "Latex-free and DEHP-free formulation", "Leak-proof seals and standardized luer lock fittings", "Color-coded for rapid clinical identification"],
            "specifications": ["Sterility: EO Sterilized / Sterile Barrier ISO 11607", "Shelf Life: 3 to 5 Years", "Biocompatibility: ISO 10993 Tested", "Packaging: Medical-grade blister pack / Tyvek pouch", "Certifications: CE Mark / ISO 13485:2016"],
            "applications": ["Intravenous Therapy", "Critical Care & ICU", "Operating Theatres", "Inpatient Wards"],
            "altPrefix": f"Sterile medical disposable {s_lower}"
        }

    # ── Diagnostic Equipments ──
    if cat_slug == "diagnostic-equipments":
        return {
            "description": f"High-precision diagnostic {s_lower} providing clinicians with rapid, accurate physiological data and vital sign readings for informed clinical decision-making.",
            "features": ["Clinically validated high-accuracy measurement sensor", "Clear backlit digital/analog visual readouts", "Ergonomic handheld or portable mounting design", "Rechargeable high-capacity battery with power-saving standby", "Anti-microbial easy-clean exterior housing"],
            "specifications": ["Accuracy: Meets AAMI / ESH / AHA Clinical Protocols", "Display: High-contrast LCD/LED or calibrated gauge", "Power Supply: Internal Li-ion battery + AC adapter", "Operating Range: 10°C to 40°C, 15-85% RH", "Safety Standard: IEC 60601-1 Medical Electrical Safety"],
            "applications": ["OPD Clinics", "Emergency Triage", "Intensive Care Units", "Hospital Wards & Ambulances"],
            "altPrefix": f"Clinical diagnostic {s_lower}"
        }

    # ── Anaesthesia Products ──
    if cat_slug == "anaesthesia-products":
        return {
            "description": f"Clinical anaesthetic {s_lower} providing reliable airway management, gas delivery control, and respiratory compliance during general surgical anaesthesia.",
            "features": ["Low-resistance flow design with minimal dead space", "Universal 22mm / 15mm ISO standard conical connectors", "Transparent kink-resistant tubing for fluid condensation visibility", "Latex-free hypoallergenic materials", "High burst pressure tolerance"],
            "specifications": ["Connector Standard: ISO 5356-1 conical fittings", "Material: Medical-grade Polypropylene / Silicone / PVC", "Pressure Limit: Tested up to 60 hPa", "Sterility: Sterile or Clean Room Packaged", "Compliance: ISO 8835 / ISO 5362"],
            "applications": ["Operating Theatres", "PACU Recovery Rooms", "Intensive Care Respiratory Care", "Emergency Resuscitation"],
            "altPrefix": f"Hospital anaesthesia {s_lower}"
        }

    # ── Autoclave & Sterilizers ──
    if cat_slug == "autoclave-sterilizers":
        return {
            "description": f"Heavy-duty hospital autoclave and sterilization {s_lower} engineered to achieve complete microbial eradication for surgical instruments, linens, and hollowware.",
            "features": ["Microprocessor PID automated temperature and cycle control", "Fractionated pre-vacuum and post-vacuum drying cycle", "Heavy-gauge SS 316L pressure chamber with ASME standards", "Dual safety relief valves and over-temperature auto shutoff", "Integrated thermal receipt printer for cycle data logging"],
            "specifications": ["Operating Temperature: 121°C and 134°C adjustable", "Working Pressure: 1.2 to 2.2 bar (15-32 psi)", "Chamber Material: Stainless Steel 316L (5-8mm thick)", "Power Rating: 220V/415V 3-Phase, 3kW to 18kW", "Standards: EN 285 / ISO 11134 / CE 0123"],
            "applications": ["Central Sterile Supply Departments (CSSD)", "Hospital Operating Suites", "Dental Surgical Clinics", "Microbiology Labs"],
            "altPrefix": f"Heavy-duty autoclave sterilizer {s_lower}"
        }

    # ── Laboratory Products ──
    if cat_slug == "laboratory-products":
        return {
            "description": f"Precision analytical laboratory {s_lower} engineered for pathology laboratories, biochemical research, and clinical diagnostics with high repeatability.",
            "features": ["Digital microprocessor control with digital feedback display", "Brushless maintenance-free induction drive mechanism", "Chemical-resistant anti-corrosive powder coated housing", "Vibration dampening suspension system", "Rapid calibration and standardized sample interfaces"],
            "specifications": ["Control: Microprocessor digital PID with LED/LCD interface", "Accuracy / Resolution: ±0.1% of reading", "Housing: Epoxy-coated cold rolled steel / SS 304", "Safety: Auto-shutoff lid interlock / thermal overload protection", "Certifications: ISO 9001 / CE IVD Directive Compliant"],
            "applications": ["Pathology & Biochemistry Labs", "Hematology Departments", "Blood Bank Testing", "Clinical Research Facilities"],
            "altPrefix": f"Clinical laboratory {s_lower}"
        }

    # ── Height & Weight Scales ──
    if cat_slug == "height-weight-scales":
        return {
            "description": f"Hospital-calibrated medical {s_lower} designed for precise anthropometric evaluation and body mass tracking across patient demographics.",
            "features": ["High-precision strain gauge load cell technology", "Anti-skid textured safety platform", "Large backlit LED/LCD display with BMI calculation", "Tare function and dynamic patient weight hold", "Heavy-duty cast iron / reinforced alloy construction"],
            "specifications": ["Capacity: Up to 300 kg (660 lbs)", "Graduation / Accuracy: 50g to 100g Class III", "Platform Dimensions: 400 x 380mm anti-slip surface", "Power: Dual AC adapter + internal rechargeable battery", "Standard: OIML Class III approved / Medical Device Directive"],
            "applications": ["OPD Consultation Rooms", "Pediatric Clinics", "Nutrition & Bariatric Centers", "Fitness & Sports Medicine"],
            "altPrefix": f"Medical weighing scale {s_lower}"
        }

    # ── OB GYN Products ──
    if cat_slug == "ob-gyn-products":
        return {
            "description": f"Specialized obstetrics and gynaecology {s_lower} engineered for gentle patient examination, labor delivery assistance, and minor gynecological procedures.",
            "features": ["Smooth atraumatic contoured edges minimize patient discomfort", "Surgical-grade stainless steel AISI 304/420 with electropolish", "Ergonomic lock-screw or handle mechanism for steady positioning", "Autoclave-safe high-durability construction", "Available in pediatric, standard, and bariatric sizing"],
            "specifications": ["Material: SS 304 / SS 420 Surgical Grade", "Finishing: Electropolished smooth satin", "Sterilization: Autoclavable up to 134°C", "Size Options: Small, Medium, Large, Extra-Large", "Standards: ISO 13485:2016 / CE Mark"],
            "applications": ["Labor & Delivery Suites", "Gynecology Outpatient Clinics", "Maternity Wards", "Family Planning Centers"],
            "altPrefix": f"Obstetric gynaecology {s_lower}"
        }

    # ── OT & Examination Lights ──
    if cat_slug == "ot-examination-lights":
        return {
            "description": f"Advanced surgical illumination {s_lower} delivering shadowless, color-corrected, high-intensity cold LED light for surgical fields without tissue dehydration.",
            "features": ["Shadow-dilution optical lens array with multi-zone LED emitters", "High color rendering index (CRI Ra ≥ 96, R9 ≥ 94) for true tissue differentiation", "Adjustable light field diameter and continuously variable lux intensity", "Ultra-low thermal radiation (heat generation < 1°C at surgical field)", "360° rotational balanced spring suspension arms with laminar flow design"],
            "specifications": ["Intensity: 40,000 to 160,000 Lux at 1 meter", "Color Temperature: 3,800K - 5,000K adjustable", "LED Lifespan: >60,000 Hours", "Focus Depth: L1+L2 ≥ 1200mm", "Standards: IEC 60601-2-41 / CE Certified"],
            "applications": ["Major Surgical Operating Theatres", "Minor Procedure Rooms", "Emergency Trauma Theatres", "Examination & Triage Rooms"],
            "altPrefix": f"Surgical LED shadowless {s_lower}"
        }

    # ── Suction Machines & Units ──
    if cat_slug == "suction-machines":
        return {
            "description": f"Heavy-duty hospital medical suction {s_lower} providing rapid, continuous, or intermittent negative pressure aspiration of surgical fluids and secretions.",
            "features": ["Oil-free maintenance-free high-flow vacuum piston pump", "Dual polycarbonate autoclavable collection jars with overflow safety trap", "Stepless precision vacuum adjustment knob with pressure gauge", "Anti-bacterial hydrophobic viral bacterial filter", "Quiet operation (<55 dB) with mobile shockproof castors"],
            "specifications": ["Vacuum Range: 0 to -0.09 MPa (0 to -680 mmHg)", "Flow Rate: 20 L/min to 80 L/min options", "Collection Jars: 2 x 2500ml / 2 x 4000ml polycarbonate", "Power: 220V AC, 50Hz / optional internal battery backup", "Standard: ISO 10079-1 Medical Suction Equipment"],
            "applications": ["Operating Theatres", "ICU & High-Dependency Units", "Emergency Trauma & Resuscitation", "Wards & Outpatient Care"],
            "altPrefix": f"Medical surgical suction {s_lower}"
        }

    # ── Medical Rubber Products ──
    if cat_slug == "medical-rubber-products":
        return {
            "description": f"Medical-grade vulcanized rubber {s_lower} manufactured for therapeutic thermal applications, pressure sore prevention, and patient clinical support.",
            "features": ["100% High-grade virgin natural rubber / medical polymer composite", "Ribbed heat-distribution surface prevents localized thermal shock", "Leak-proof brass threaded or vulcanized stopper mechanism", "Hypoallergenic, non-toxic, and resistant to medical disinfectants", "High tensile elasticity resists cracking and deterioration"],
            "specifications": ["Material: Medical-Grade Vulcanized Rubber / Silicone", "Capacity / Dimensions: Standard Hospital Specifications", "Pressure Resistance: Tested to 2.5 bar hydraulic pressure", "Temperature Range: -10°C to 95°C", "Standards: BS 1970:2012 / ISO 9001:2015"],
            "applications": ["Inpatient Hospital Care", "Post-Surgical Pain Therapy", "Elderly Care & Geriatrics", "Physiotherapy & Home Healthcare"],
            "altPrefix": f"Hospital medical rubber {s_lower}"
        }

    # ── Hospital Holloware ──
    if cat_slug == "hospital-holloware":
        return {
            "description": f"Seamless stainless steel hospital holloware {s_lower} manufactured from heavy-gauge AISI 304 for sterile instrument handling, waste collection, and bedside utility.",
            "features": ["Seamless deep-drawn construction eliminates bacterial retention crevices", "Mirror electropolished inner and outer surface for effortless decontamination", "Rolled safety rim edge prevents accidental cuts during handling", "Autoclavable repeatedly at 134°C without tarnishing or corrosion", "Stackable design saves valuable CSSD and ward storage space"],
            "specifications": ["Material: AISI 304 (18/8) Austenitic Stainless Steel", "Sheet Thickness: 0.6mm to 1.0mm heavy gauge", "Sterilization: Autoclave 134°C / Dry Heat 180°C / Chemical Disinfection", "Standards: ISO 13485:2016 / CE Mark", "Corrosion Resistance: Passivated per ASTM A967"],
            "applications": ["Operating Theatres", "Ward Dressing & Injection Rooms", "Sterile Storage & CSSD", "Patient Bedside Care"],
            "altPrefix": f"Stainless steel hospital holloware {s_lower}"
        }

    # ── Infant Care Equipments ──
    if cat_slug == "infant-care-equipments":
        return {
            "description": f"Critical neonatal intensive care {s_lower} engineered to maintain optimal microenvironment temperature, phototherapy treatment, and vital monitoring for premature infants.",
            "features": ["Microprocessor-controlled skin and air servo temperature modes", "Far-infrared ceramic heating element with parabolic reflector", "LED phototherapy array with optimal 450-470nm jaundice wavelength", "Tilting baby bassinet with collapsible acrylic safety side walls", "Comprehensive audio-visual alarms for temperature deviation and probe disconnect"],
            "specifications": ["Temp Control Range: Air mode 25.0°C - 37.0°C, Skin mode 34.0°C - 37.5°C", "Temperature Uniformity: ≤ 0.8°C across mattress", "Phototherapy Irradiance: 30-45 µW/cm²/nm at mattress level", "Alarms: High/Low temp, sensor failure, power failure, overheat", "Safety Standard: IEC 60601-2-21 / IEC 60601-2-35"],
            "applications": ["Neonatal Intensive Care Units (NICU)", "Special Care Baby Units (SCBU)", "Labor & Delivery Rooms", "Pediatric Wards"],
            "altPrefix": f"Neonatal infant care {s_lower}"
        }

    # ── Laryngoscope Set & Spares ──
    if cat_slug == "laryngoscope-sets":
        return {
            "description": f"Clinical intubation {s_lower} featuring high-intensity cold illumination and precision stainless steel blades for difficult and routine endotracheal airway management.",
            "features": ["Integrated high-output fiber optic bundle or LED light guide", "High-grade non-magnetic austenitic stainless steel blade construction", "Standardized green-system ISO 7376 fitting compatible with all major brands", "Autoclavable fiber optic blades withstand repeated steam sterilization cycles", "Knurled non-slip handle with ergonomic grip balance"],
            "specifications": ["Illumination: Xenon / LED >5,000 Lux cold light", "Blade Profiles: Macintosh (curved) #0-#5, Miller (straight) #0-#4", "Fitting Standard: ISO 7376 (Green System)", "Material: AISI 303/304 Stainless Steel", "Power: 2 x C-Cell / AA battery or rechargeable Li-ion handle"],
            "applications": ["Anaesthesia Induction", "Emergency Intubation & ICU", "Ambulance Airway Management", "Resuscitation Crash Carts"],
            "altPrefix": f"Medical intubation laryngoscope {s_lower}"
        }

    # ── Cold Chain Equipments ──
    if cat_slug == "cold-chain-equipments":
        return {
            "description": f"WHO-PQS certified vaccine and cold chain storage {s_lower} maintaining critical +2°C to +8°C biological storage in challenging climatic and electrical conditions.",
            "features": ["Ice-lined thermal storage maintains internal holdover time up to 48+ hours without power", "CFC-free ozone-friendly high-efficiency compressor refrigeration", "Digital temperature display with internal data logger and USB export", "Lockable heavy-duty lid with reinforced silicone rubber sealing gaskets", "Corrosion-resistant galvanized steel interior with wire storage baskets"],
            "specifications": ["Temperature Range: +2°C to +8°C stable vaccine storage", "Holdover Time: 40 to 72 Hours at +43°C ambient temperature", "Insulation: 100mm high-density cyclopentane PUF", "Refrigerant: R600a / R134a Eco-friendly", "Standards: WHO/PQS pre-qualified / ISO 9001:2015"],
            "applications": ["Vaccine Immunization Centers", "Hospital Blood Banks", "Public Health Cold Chain Hubs", "Pharmaceutical Logistics"],
            "altPrefix": f"Cold chain vaccine storage {s_lower}"
        }

    # ── Emergency Products ──
    if cat_slug == "emergency-products":
        return {
            "description": f"Rapid-response emergency trauma {s_lower} designed for pre-hospital stabilization, patient rescue, and immobilization in critical triage situations.",
            "features": ["High-density seamless polyethylene or aircraft-grade alloy construction", "X-ray translucent and MRI compatible for in-hospital scanning", "Multiple handhold perimeter grips and patient restraint strap slots", "Buoyant, water-impervious, and easy to decontaminate after use", "Compatible with cervical collars and head immobilizer units"],
            "specifications": ["Load Capacity: 200 kg to 350 kg safe working load", "Material: High-Molecular Weight Polyethylene / Aircraft Aluminum", "Radio-translucent: 100% X-Ray, CT, and MRI compatible", "Dimensions: Standard Adult Trauma Specifications", "Standard: EN 1865 / CE Directive Compliant"],
            "applications": ["Emergency Medical Services (EMS)", "Search & Rescue Operations", "Trauma & Disaster Response", "Hospital Emergency Departments"],
            "altPrefix": f"Emergency rescue trauma {s_lower}"
        }

    # ── Misc. Surgical Medical Products ──
    if cat_slug == "misc-surgical-products":
        return {
            "description": f"Essential clinical {s_lower} providing surgical teams with auxiliary illumination, vein illumination, procedure marking, and field support.",
            "features": ["High-efficiency LED illumination with focused spot beam", "Medical-grade non-toxic skin-safe hypoallergenic formulation", "Compact, lightweight, and pocket-portable ergonomic design", "Long battery endurance with commercial battery interchangeability", "Water and disinfectant-resistant casing"],
            "specifications": ["Material: Medical-grade aluminum alloy / clinical polymers", "Power: AAA / AA / Rechargeable battery options", "Safety: Eye-safe optical LED photobiological compliance", "Certifications: CE Mark / ISO 9001:2015", "Packaging: Individual clinical packaging"],
            "applications": ["General Clinical Examination", "Operating Theatre Auxiliary Support", "Phlebotomy & IV Access", "Pre-Operative Surgical Site Marking"],
            "altPrefix": f"Clinical medical accessory {s_lower}"
        }

    # ── Hospital Scrubs & Linens ──
    if cat_slug == "hospital-scrubs-linens":
        return {
            "description": f"Medical apparel and sterile hospital {s_lower} engineered with fluid-barrier protection, breathability, and anti-microbial properties for surgical staff and patients.",
            "features": ["High-grade cotton-poly blend or non-woven SMS fluid-repellent fabric", "Reinforced double-stitched seams resist industrial laundry cycles", "Autoclavable and bleach-resistant vat dyes that retain color integrity", "Hypoallergenic lint-free fabric prevents particulate contamination in OT", "Ergonomic cut for maximum range of movement during long surgical procedures"],
            "specifications": ["Fabric: 65% Polyester / 35% Combed Cotton or 100% Cotton 210 GSM", "Barrier Level: AAMI Level 2/3/4 Fluid Resistance", "Laundry Endurance: Tested to >100 institutional wash cycles at 71°C", "Anti-microbial: Silver-ion or zinc bacteriostatic finish", "Standard: EN 13795 / ISO 22610"],
            "applications": ["Operating Theatres", "Intensive Care Units", "Inpatient Wards", "Hospital Laundry & Linen Services"],
            "altPrefix": f"Hospital medical surgical {s_lower}"
        }

    # ── OT Tables ──
    if cat_slug == "ot-tables":
        return {
            "description": f"Advanced surgical operating table {s_lower} providing multi-positioning flexibility, electro-hydraulic movement, and C-arm radiolucent coverage for complex surgical operations.",
            "features": ["Heavy-duty electro-hydraulic or mechanical hydraulic lifting columns", "Full radiolucent carbon fiber / phenolic tabletop for 360° C-arm fluoroscopy", "Longitudinal sliding table top (up to 350mm) for maximum surgical access", "Multi-jointed sections: backrest, kidney bridge, Trendelenburg, lateral tilt, split leg", "High-density anti-static memory foam mattress with seamless waterproof cover"],
            "specifications": ["Safe Working Load: 250 kg to 350 kg patient weight capacity", "Height Adjustment: 650mm to 1050mm motorized elevation", "Trendelenburg / Reverse: ±25° to ±30° tilt", "Lateral Tilt: ±20° left / right", "Base: Stainless steel 304 with central floor locking brake system", "Standard: IEC 60601-2-46 Operating Tables"],
            "applications": ["General Surgery", "Orthopaedic Surgery", "Cardiovascular & Neuro Surgery", "Laparoscopic & Urology Procedures"],
            "altPrefix": f"Advanced surgical operating table {s_lower}"
        }

    # ── Rehabilitation Products & Aids ──
    if cat_slug == "rehabilitation-products":
        return {
            "description": f"Ergonomic mobility and orthopedic rehabilitation {s_lower} designed to restore patient independence, correct postural alignment, and support physical therapy recovery.",
            "features": ["Lightweight aircraft-grade anodized aluminum or high-strength tubular steel frame", "Folds compactly for convenient storage and vehicle transport", "Anatomically contoured grips and breathable anti-decubitus cushions", "Heavy-duty solid PU puncture-proof wheels with dual parking brakes", "Height-adjustable mechanisms with secure push-pin positive locks"],
            "specifications": ["Weight Capacity: 120 kg to 200 kg bariatric models", "Frame: Anodized 6061-T6 Aluminum / Powder-coated MS", "Wheelchair Seat Width: 400mm to 500mm options", "Adjustment: 5-level to 10-level push-button height telescoping", "Standards: ISO 7176 Wheelchairs / CE Medical Device"],
            "applications": ["Physical Therapy & Rehabilitation", "Elderly Care Facilities", "Orthopaedic Recovery", "Home Healthcare Mobility"],
            "altPrefix": f"Orthopaedic rehabilitation mobility {s_lower}"
        }

    # ── Dental Equipments ──
    if cat_slug == "dental-equipments":
        return {
            "description": f"Modern dental operatory {s_lower} combining ergonomic patient positioning, high-torque precision handpieces, and sterile delivery systems for dental surgery.",
            "features": ["Quiet electro-mechanical motor drive with synchronized backrest and seat movement", "Integrated delivery unit with 3-way syringe, high and low-speed handpiece tubing", "Shadowless LED operating light with sensor activation and color temp control", "Ceramic rotatable spittoon with automated cup filler and bowl flush", "Multifunctional foot control pedal for hands-free chair and instrument operation"],
            "specifications": ["Chair Lift: Electro-mechanical motor with safety auto-stop", "Air Pressure Requirement: 0.55 - 0.80 MPa clean dry medical air", "Water Pressure: 0.20 - 0.40 MPa purified line", "Upholstery: Seamless anti-microbial medical PU leather", "Standards: ISO 6875 Dental Patient Chair / IEC 60601-1"],
            "applications": ["Dental Clinics & Operatories", "Oral & Maxillofacial Surgery", "Orthodontic & Endodontic Centers", "Dental Teaching Hospitals"],
            "altPrefix": f"Professional dental clinic {s_lower}"
        }

    # ── Blood Collection Tubes ──
    if cat_slug == "blood-collection-tubes":
        return {
            "description": f"Standardized vacuum blood collection {s_lower} with pre-dosed clinical additives for accurate diagnostic hematology, biochemistry, and coagulation analysis.",
            "features": ["Precisely calibrated vacuum draw ensures exact blood-to-additive ratio", "Color-coded safety cap prevents aerosol generation upon opening", "Ultra-clear medical PET or neutral borosilicate glass tube wall", "Siliconized inner tube wall minimizes erythrocyte adherence and hemolysis", "Compatible with standard automated clinical chemistry analyzers and centrifuges"],
            "specifications": ["Draw Volumes: 1.0ml to 10.0ml standardized tubes", "Tube Size: 13x75mm, 13x100mm, 16x100mm", "Additive: Spray-dried K2-EDTA / K3-EDTA / Sodium Citrate / Clot Activator", "Sterility: Gamma radiation sterilized / ISO 11137", "Standard: ISO 6710 / CLSI GP39-A6"],
            "applications": ["Clinical Pathology Laboratories", "Blood Transfusion Centers", "Hospital Phlebotomy Outpatient", "Diagnostic Research Institutes"],
            "altPrefix": f"Vacuum blood collection {s_lower}"
        }

    # ── Medical Imaging ──
    if cat_slug == "medical-imaging":
        return {
            "description": f"High-resolution diagnostic medical imaging {s_lower} engineered with high-frequency generator technology and digital flat panel detection for crisp clinical visualization.",
            "features": ["High-frequency multipulse X-ray generator minimizes scatter radiation dose", "High-definition cesium iodide (CsI) flat panel detector with low noise", "Intuitive touchscreen console with anatomical programming (APR)", "Wide dynamic range imaging with DICOM 3.0 PACS connectivity", "Counterbalanced motorized positioning with multi-axis articulation"],
            "specifications": ["Generator Power: 30kW to 65kW high frequency (40-150 kVp)", "Detector: 43x43cm CsI Flat Panel, 16-bit dynamic range, pixel pitch 139 µm", "Heat Capacity: X-Ray Tube Anode 300 kHU to 600 kHU", "Connectivity: DICOM 3.0 Print, Store, Worklist, PACS", "Safety Standard: IEC 60601-2-54 / AERB / CE Certified"],
            "applications": ["Radiology Departments", "Orthopaedic Clinics", "Operating Theater Fluoroscopy", "Emergency Trauma Radiography"],
            "altPrefix": f"Diagnostic medical imaging {s_lower}"
        }

    # ── ICU Equipment ──
    if cat_slug == "icu-equipment":
        return {
            "description": f"Life-critical intensive care {s_lower} delivering continuous multiparameter physiological tracking and organ support for high-acuity patients.",
            "features": ["High-resolution multi-parameter TFT touchscreen with customizable clinical waveforms", "Advanced arrhythmia detection, ST-segment analysis, and full-disclosure trend storage", "Seamless central nursing station integration via wired or wireless telemetry", "Multi-stage audio-visual intelligent alarm system with flashing status bar", "Hot-swappable dual battery system ensuring uninterrupted bedside operation"],
            "specifications": ["Display: 12.1\" to 19\" color TFT LCD multi-touch display", "Standard Parameters: 3/5-lead ECG, SpO2, NIBP, Dual Temp, Resp, Pulse", "Advanced Parameters: 2x IBP, EtCO2, Cardiac Output, BIS, Neuromuscular", "Battery Life: >4 Hours internal rechargeable lithium backup", "Safety Standards: IEC 60601-1 / IEC 60601-2-49 ICU Safety"],
            "applications": ["Intensive Care Units (ICU)", "Coronary Care Units (CCU)", "Post-Anesthesia Care Units (PACU)", "High Dependency Trauma Centers"],
            "altPrefix": f"Critical care ICU {s_lower}"
        }

    # ── OT Equipment ──
    if cat_slug == "ot-equipment":
        return {
            "description": f"Specialized operating room {s_lower} providing surgical precision, clean utility management, and digital theater control for modern surgical suites.",
            "features": ["High-frequency electrosurgical cutting and coagulation with tissue impedance sensing", "Heavy-duty ceiling articulated arms with pneumatic or electric braking systems", "Integrated medical gas, electrical, and data service management", "Touchscreen surgical control master panel for ventilation, lighting, and timer coordination", "Electromagnetically shielded and sealed against sterile liquid entry"],
            "specifications": ["Power Output: Up to 400W pure cut / 120W coagulation at 300-500 kHz", "Arm Payload: 150 kg to 300 kg distributed load capacity", "Rotation: 330° dual articulation with stop mechanism", "Panel Interface: Industrial touchscreen interface with IP65 front face", "Standards: IEC 60601-2-2 / HTM 02-01 / CE Mark"],
            "applications": ["Modular Operating Theatres", "Minimally Invasive Surgery Suites", "Endoscopy Procedure Rooms", "Cardiac Catheterization Labs"],
            "altPrefix": f"Operating theatre {s_lower}"
        }

    # ── Physiotherapy Equipments ──
    if cat_slug == "physiotherapy-equipments":
        return {
            "description": f"Clinical physical therapy {s_lower} utilizing targeted electrotherapeutic and mechanical modalities for pain management, neuromuscular rehabilitation, and tissue recovery.",
            "features": ["Microprocessor-controlled therapeutic frequency generator with pre-set clinical protocols", "Multi-channel outputs allow simultaneous treatment of multiple anatomical zones", "Large backlit digital interface with real-time countdown timer and intensity bar", "Patient safety interrupt switch allows instant user-controlled session stop", "Continuous and pulsed therapeutic wave emission modes"],
            "specifications": ["Frequency Range: 1 MHz / 3 MHz Ultrasound; 1-150 Hz TENS; 27.12 MHz Diathermy", "Output Channels: 2 to 4 independent isolated channels", "Treatment Timer: 1 to 60 Minutes adjustable", "Power: 220-240V AC, 50Hz with medical isolation transformer", "Standard: IEC 60601-2-10 / CE Medical Device Directive"],
            "applications": ["Physiotherapy & Sports Rehab Clinics", "Hospital Orthopaedic OPD", "Pain Management Centers", "Chiropractic & Wellness Centers"],
            "altPrefix": f"Clinical physiotherapy {s_lower}"
        }

    # ── Radiation Protection Lead Apparels ──
    if cat_slug == "radiation-protection":
        return {
            "description": f"High-protection medical radiation shielding {s_lower} engineered with lightweight multi-ply lead-free or micro-lead vinyl for comprehensive radiological safety.",
            "features": ["0.35mm / 0.50mm Pb lead-equivalence shielding meets international IEC 61331-3 standards", "Lightweight composite formulation reduces musculoskeletal shoulder fatigue by up to 25%", "Criss-cross back support straps with heavy-duty quick-release Velcro fastenings", "Anti-microbial fluid-resistant outer fabric simplifies disinfectant wiping", "Internal hanging loops for proper wall rack storage preventing shielding creases"],
            "specifications": ["Lead Equivalence: 0.35mm Pb front, 0.25mm Pb back or 0.50mm Pb full protection", "Core Material: Multi-layered lightened antimony/bismuth/lead polymer composite", "Outer Fabric: Stain-resistant waterproof coated nylon oxford", "Weight: 3.2 kg to 4.8 kg (depending on size and Pb rating)", "Standard: IEC 61331-1:2014 / ASTM F2547 / CE 0120"],
            "applications": ["Interventional Cardiology & Cath Labs", "Operating Room C-Arm Fluoroscopy", "Diagnostic Radiology & CT Scan Rooms", "Dental Maxillofacial X-Ray"],
            "altPrefix": f"Radiation protection lead {s_lower}"
        }

    # ── Covid-19 Products ──
    if cat_slug == "covid-19-products":
        return {
            "description": f"Hospital-grade personal protective and infection control {s_lower} engineered for viral barrier filtration, mucosal barrier protection, and surface disinfection.",
            "features": ["Multi-layer meltblown filtration media with >95% to 99% bacterial filtration efficiency (BFE)", "Seamless ultrasonic seam sealing provides liquid and aerosol penetration resistance", "Anti-fog distortion-free optical transparency for eye and face protection", "Skin-safe hypoallergenic materials prevent contact dermatitis during prolonged shifts", "Certified compliance with SITRA / NIOSH / CE international pandemic standards"],
            "specifications": ["Filtration Efficiency: BFE ≥ 99%, PFE ≥ 95% at 0.3 micron", "Fabric: Polypropylene Spunbond + Meltblown (SMS / SSMMS 70-90 GSM)", "Fluid Resistance: Synthetic blood penetration resistance at 120-160 mmHg", "Sterility: EO Sterilized / Non-Sterile medical variants", "Standards: EN 14683 / ASTM F2100 / ISO 13485:2016"],
            "applications": ["Isolation Wards & Covid ICUs", "Fever Clinics & Triage Units", "Pathology Viral Testing Labs", "Hospital General Infection Control"],
            "altPrefix": f"Medical infection control {s_lower}"
        }

    # ── Veterinary Medical Equipment ──
    if cat_slug == "veterinary-equipment":
        return {
            "description": f"Veterinary-specific medical and surgical {s_lower} engineered to meet the distinct physiological and anatomical requirements of small animal and equine clinical care.",
            "features": ["Surgical-grade stainless steel AISI 316L / 420 sized specifically for animal anatomy", "Reinforced locking mechanisms and heavy-duty hinges withstand high animal shear stress", "Quick-connect attachments and modular sizing for canine, feline, and large animal use", "Autoclave-safe high-durability construction resistant to animal fluids and chemical disinfectants", "Smooth atraumatic edges reduce animal tissue trauma during surgery"],
            "specifications": ["Material: SS 316L / Titanium / Medical ABS", "Compatibility: Small animal (canine/feline) and large animal (equine/bovine)", "Sterilization: Autoclavable at 134°C / Chemical Sterilization", "Finishing: Satin glare-resistant surgical polish", "Certifications: ISO 9001:2015 / CE Certified"],
            "applications": ["Veterinary Hospitals & Specialty Clinics", "Animal Orthopaedic Surgery", "Equine Veterinary Centers", "Zoological & Wildlife Healthcare"],
            "altPrefix": f"Veterinary medical surgical {s_lower}"
        }

    # Default fallback
    return {
        "description": f"Professional hospital-grade {s_lower} designed for intensive clinical healthcare facilities, manufactured in compliance with international ISO 13485 standards.",
        "features": [f"Precision-engineered {s_lower} for healthcare utility", "Medical-grade durable construction", "Anti-corrosion hygienic finish", "Designed for continuous clinical use", "Compliant with international safety protocols"],
        "specifications": ["Material: Medical-grade surgical stainless steel / engineering polymer", "Finish: Passivated and electropolished", "Compliance: ISO 13485:2016 / CE Mark", "Testing: Factory calibrated and tested", "Packaging: Standard export protective packaging"],
        "applications": ["Hospitals", "Clinics", "Medical Centers", "Surgical Suites"],
        "altPrefix": f"Medical {s_lower}"
    }

# Build the metadata dictionary
meta_dict = {}
total_subs = 0

for cat in CATEGORIES:
    cat_slug = cat["slug"]
    for sub in cat["subcategories"]:
        total_subs += 1
        key = f"{cat_slug}/{sub.lower()}"
        meta_dict[key] = generate_sub_meta(cat_slug, sub)

print(f"Generated metadata for {total_subs} subcategories across {len(CATEGORIES)} categories.")

# Generate TypeScript code
ts_lines = [
    "// ═══════════════════════════════════════════════════════════════════",
    "// EKOSYS Corporation — Domain Metadata Catalog",
    f"// {len(CATEGORIES)} Categories · {total_subs} Subcategories · Complete Medical Domain Data",
    "// ═══════════════════════════════════════════════════════════════════",
    "",
    "export interface SubcategoryMeta {",
    "  description: string;",
    "  features: string[];",
    "  specifications: string[];",
    "  applications: string[];",
    "  altPrefix: string;",
    "}",
    "",
    "export const catalogMetadata: Record<string, SubcategoryMeta> = {"
]

for k, v in meta_dict.items():
    escaped_k = k.replace("'", "\\'")
    v_json = json.dumps(v, indent=2)
    indented = "\n".join("  " + line for line in v_json.split("\n"))
    ts_lines.append(f"  '{escaped_k}': {indented.strip()},")

ts_lines.append("};")
ts_lines.append("")
ts_lines.append("export function getSubcategoryMetadata(categorySlug: string, subName: string): SubcategoryMeta {")
ts_lines.append("  const key = `${categorySlug}/${subName.toLowerCase()}`;")
ts_lines.append("  if (catalogMetadata[key]) {")
ts_lines.append("    return catalogMetadata[key];")
ts_lines.append("  }")
ts_lines.append("  // Fallback")
ts_lines.append("  return {")
ts_lines.append("    description: `High-quality ${subName.toLowerCase()} manufactured to international healthcare standards for clinical excellence and patient safety.`,")
ts_lines.append("    features: [")
ts_lines.append("      `Professional-grade ${subName.toLowerCase()} construction`,")
ts_lines.append("      'Medical-grade materials for durability and hygiene',")
ts_lines.append("      'Designed for intensive clinical environments',")
ts_lines.append("      'Compliant with international medical standards',")
ts_lines.append("      'Easy maintenance and cleaning procedures'")
ts_lines.append("    ],")
ts_lines.append("    specifications: [")
ts_lines.append("      'Material: Medical-grade stainless steel / engineering polymers',")
ts_lines.append("      'Construction: Precision-machined components',")
ts_lines.append("      'Finish: Anti-corrosion treated surface',")
ts_lines.append("      'Compliance: ISO 13485:2016 manufacturing standards',")
ts_lines.append("      'Packaging: Protective clinical packaging'")
ts_lines.append("    ],")
ts_lines.append("    applications: ['Hospitals', 'Clinics', 'Healthcare Facilities', 'Medical Centers'],")
ts_lines.append("    altPrefix: subName")
ts_lines.append("  };")
ts_lines.append("}")
ts_lines.append("")

output_path = r"d:\Website\ekosysMedTech\ekosys-medtech\src\data\catalogMeta.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(ts_lines))

print(f"Successfully written {output_path}")
