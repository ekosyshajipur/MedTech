export interface GuideSection {
  heading: string;
  content: string;
  keyPoints?: string[];
}

export interface BuyerGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    role: string;
    department: string;
  };
  reviewer: {
    name: string;
    role: string;
  };
  intro: string;
  sections: GuideSection[];
  relatedCategorySlugs: string[];
  relatedSubcategorySlugs: { catSlug: string; subSlug: string; name: string }[];
  faqs: { question: string; answer: string }[];
}

export const buyerGuides: BuyerGuide[] = [
  {
    id: "guide-1",
    slug: "hospital-bed-buying-guide",
    title: "Hospital Bed Buying Guide: Technical Specifications, ICU vs. Ward Allocation & Safety Standards",
    subtitle: "A clinical engineering guide on selecting motorized ICU beds, Fowler beds, and ward patient accommodation systems.",
    metaDescription: "Comprehensive hospital bed buying guide covering motorized 5-function ICU beds, manual Fowler beds, safe working load (SWL), Trendelenburg positioning, and ISO 13485 standards.",
    category: "Hospital Furniture",
    readTime: "7 min read",
    datePublished: "2024-10-15",
    dateModified: "2025-01-10",
    author: {
      name: "EKOSYS Biomedical Engineering Desk",
      role: "Clinical Equipment Standards Team",
      department: "Hospital Infrastructure Division"
    },
    reviewer: {
      name: "Engineering Quality Assurance Team",
      role: "ISO 13485 Compliance Lead"
    },
    intro: "Selecting the appropriate patient beds is among the most consequential capital equipment investments for any hospital. From intensive care units (ICUs) requiring emergency CPR cardiac release and Trendelenburg tilt to general wards where durability and infection control are paramount, this guide outlines critical engineering parameters, regulatory standards, and allocation metrics.",
    sections: [
      {
        heading: "1. Core Bed Configurations: ICU, Fowler, and Semi-Fowler",
        content: "Understanding the kinematic capabilities of different bed types is essential for clinical alignment:",
        keyPoints: [
          "5-Function Motorized ICU Beds: Feature motorized height adjustment, backrest elevation (0-75°), knee-rest flexion (0-45°), Trendelenburg (±15°), and Reverse Trendelenburg. Essential for ventilated and hemodynamically unstable patients.",
          "Fowler Beds: Provide dual-crank mechanical or dual-motor adjustment for backrest and knee flexion. Suited for step-down units and postoperative surgical recovery.",
          "Semi-Fowler Beds: Single adjustment for backrest elevation, widely deployed across general inpatient wards for patient comfort and respiratory ease.",
          "Orthopaedic Beds: Reinforced with integrated Balkan traction frames and monkey poles for continuous skeletal traction management."
        ]
      },
      {
        heading: "2. Structural Integrity, Safe Working Load (SWL) & Antimicrobial Coatings",
        content: "Patient safety requires rigid engineering tolerances. Safe Working Load (SWL) should be rated to at least 250 kg (550 lbs) to accommodate patient mass, mattress, and attached accessories. Structural frames manufactured from cold-rolled rectangular steel tubes must undergo seven-tank pre-treatment and electropolished epoxy powder coating to resist harsh hospital chemical disinfectants and corrosion."
      },
      {
        heading: "3. Castor Systems & Emergency CPR Release Mechanisms",
        content: "In emergency cardiac events, every second matters. Motorized ICU beds must feature a manual dual-sided quick-release CPR lever that flattens the backrest instantaneously without electrical power. Mobility should be anchored by 125mm or 150mm central-locking castor wheels with directional steering pedals to ensure effortless ward transport."
      }
    ],
    relatedCategorySlugs: ["hospital-medical-furniture"],
    relatedSubcategorySlugs: [
      { catSlug: "hospital-medical-furniture", subSlug: "icu-beds", name: "ICU Beds" },
      { catSlug: "hospital-medical-furniture", subSlug: "fowler-beds", name: "Fowler Beds" },
      { catSlug: "hospital-medical-furniture", subSlug: "semi-fowler-beds", name: "Semi Fowler Beds" }
    ],
    faqs: [
      {
        question: "What is the difference between Safe Working Load (SWL) and Maximum Patient Weight?",
        answer: "Safe Working Load includes the total mass supported by the bed structure—the patient, mattress, bedding, IV poles, and medical accessories. Maximum Patient Weight refers exclusively to the patient's body weight."
      },
      {
        question: "How often should motorized ICU beds undergo electrical safety calibration?",
        answer: "Per IEC 60601-1 standards, medical electrical equipment must undergo annual safety inspection for chassis leakage current, earth resistance, and actuator function."
      }
    ]
  },
  {
    id: "guide-2",
    slug: "icu-equipment-procurement-guide",
    title: "ICU Equipment Procurement Guide: Multiparameter Monitoring, Ventilation & Critical Care Workstations",
    subtitle: "Technical checklist for equipping intensive care units with high-acuity life support and patient telemetry systems.",
    metaDescription: "Essential ICU equipment procurement checklist covering 15-inch patient monitors, invasive blood pressure (IBP), ICU ventilators, syringe pumps, and defibrillators.",
    category: "Critical Care",
    readTime: "8 min read",
    datePublished: "2024-11-05",
    dateModified: "2025-01-18",
    author: {
      name: "EKOSYS Critical Care Technical Group",
      role: "Life Support Engineering Specialist",
      department: "Critical Care Technology"
    },
    reviewer: {
      name: "Quality Assurance Directorate",
      role: "Medical Device Regulatory Affairs"
    },
    intro: "Intensive Care Units demand zero-compromise technological reliability. Equipping a modern tertiary ICU requires harmonizing multi-parameter vital signs telemetry, invasive pressure lines, automated drug infusion, and emergency cardiac life support. This checklist serves hospital biomedical engineers and procurement teams.",
    sections: [
      {
        heading: "1. Multiparameter Patient Monitoring Architecture",
        content: "High-acuity bedside monitors must display real-time physiological waveforms with minimal latency:",
        keyPoints: [
          "Display & Interface: Minimum 12.1\" to 15.6\" high-resolution touchscreen with configurable multi-waveform layouts.",
          "Standard Parameters: 3/5-lead ECG with ST-segment analysis, SpO2 (anti-motion tolerance), non-invasive blood pressure (NIBP), dual temperature, and impedance respiration.",
          "Advanced Critical Care Modules: Dual invasive blood pressure (IBP), end-tidal CO2 (EtCO2 microstream), and continuous cardiac output (CCO).",
          "Central Station Telemetry: Seamless bidirectional HL7 networking connecting bedside units to the central nursing station."
        ]
      },
      {
        heading: "2. Precision Syringe and Volumetric Infusion Pumps",
        content: "Administering vasoactive and inotropic medications requires micro-flow precision. Infusion systems should support flow rates from 0.1 ml/h to 1200 ml/h with accuracy within ±2%, automated syringe size recognition, anti-bolus pressure relief, and dynamic pressure monitoring for line occlusion detection."
      },
      {
        heading: "3. Emergency Defibrillation & Resuscitation Equipment",
        content: "Biphasic defibrillators with automated external defibrillator (AED) advisory mode, synchronized cardioversion, and non-invasive transcutaneous pacing are essential for cardiac arrest readiness at every intensive care nursing station."
      }
    ],
    relatedCategorySlugs: ["icu-equipment", "suction-machines"],
    relatedSubcategorySlugs: [
      { catSlug: "icu-equipment", subSlug: "patient-monitors", name: "Patient Monitors" },
      { catSlug: "icu-equipment", subSlug: "ventilators", name: "Ventilators" },
      { catSlug: "icu-equipment", subSlug: "infusion-pumps", name: "Infusion Pumps" },
      { catSlug: "icu-equipment", subSlug: "defibrillators", name: "Defibrillators" }
    ],
    faqs: [
      {
        question: "Why is biphasic waveform superior to monophasic in ICU defibrillators?",
        answer: "Biphasic defibrillation reverses electrical current direction mid-shock, delivering effective myocardial defibrillation at significantly lower total energy levels, thereby minimizing post-shock cardiac damage."
      }
    ]
  },
  {
    id: "guide-3",
    slug: "operating-theatre-equipment-checklist",
    title: "Operating Theatre Equipment Checklist: Modular OT Tables, Surgical LED Lights & Electrosurgery",
    subtitle: "A comprehensive clinical facility planning guide for equipping modern surgical suites and minor procedure theaters.",
    metaDescription: "Complete operating theatre equipment checklist detailing electro-hydraulic C-arm compatible OT tables, 160,000 Lux cold LED lights, and 400W electrosurgical units.",
    category: "Surgical & OT",
    readTime: "9 min read",
    datePublished: "2024-11-22",
    dateModified: "2025-02-01",
    author: {
      name: "EKOSYS Surgical Systems Division",
      role: "Operating Theater Infrastructure Engineer",
      department: "Surgical Technology"
    },
    reviewer: {
      name: "Engineering Standards Directorate",
      role: "Surgical Equipment Safety Reviewer"
    },
    intro: "Modern operating theaters require an ergonomically synchronized environment where surgical lighting, patient positioning, electrical cutting, and medical gas management operate flawlessly. Here is the engineering checklist for equipping major surgical suites.",
    sections: [
      {
        heading: "1. Electro-Hydraulic Operating Tables with C-Arm Compatibility",
        content: "The surgical table is the anchor of the theater. Modern requirements include:",
        keyPoints: [
          "Full Radiolucency: Carbon fiber or high-density phenolic tabletop enabling complete 360° fluoroscopic coverage with mobile C-arm systems.",
          "Longitudinal Slide: 300mm to 350mm motorized longitudinal shift eliminating the need to reposition the patient during intraoperative imaging.",
          "Kinematic Adjustments: Motorized Trendelenburg (±30°), lateral tilt (±20°), back plate flexion, and split modular leg sections.",
          "Hygiene: Heavy-gauge AISI 304 stainless steel column cover and floor-locking electro-hydraulic braking."
        ]
      },
      {
        heading: "2. Shadowless Cold LED Surgical Lighting",
        content: "Effective surgical visualization prevents ocular fatigue and enhances tissue differentiation. Ceiling-mounted twin-dome setups should deliver 120,000 to 160,000 Lux with a Color Rendering Index (CRI Ra) ≥ 96, R9 deep red index ≥ 94, adjustable color temperature (3,800K to 5,000K), and laminar airflow aerodynamic dome profiling."
      },
      {
        heading: "3. Electrosurgical Units (ESU) & Tissue Management",
        content: "400W high-frequency electrosurgical generators with pure cut, blend, contact coagulation, spray coagulation, and bipolar cutting modes with automated contact quality monitoring (CQM) for patient return electrode safety."
      }
    ],
    relatedCategorySlugs: ["ot-tables", "ot-examination-lights", "ot-equipment"],
    relatedSubcategorySlugs: [
      { catSlug: "ot-tables", subSlug: "c-arm-compatible-tables", name: "C-Arm Compatible Tables" },
      { catSlug: "ot-examination-lights", subSlug: "led-ot-lights", name: "LED OT Lights" },
      { catSlug: "ot-equipment", subSlug: "electrosurgical-units", name: "Electrosurgical Units" }
    ],
    faqs: [
      {
        question: "Why is high R9 value critical in surgical LED operating lights?",
        answer: "R9 measures how accurately light reveals saturated red colors. High R9 (≥ 90) allows surgeons to distinguish subtle tissue vascularity, oxygenation levels, and organ margins during deep-cavity surgery."
      }
    ]
  },
  {
    id: "guide-4",
    slug: "hospital-furniture-planning-guide",
    title: "Hospital Furniture Planning Guide: Ward Allocation, Patient Ergonomics & Infection Control",
    subtitle: "Strategic guidance on calculating furniture quantities, ward layouts, and antimicrobial durability for hospital infrastructure.",
    metaDescription: "Hospital furniture planning and procurement guide covering ward bed allocation formulas, stainless steel trolleys, bedside lockers, and CSSD storage standards.",
    category: "Hospital Infrastructure",
    readTime: "6 min read",
    datePublished: "2024-12-10",
    dateModified: "2025-02-12",
    author: {
      name: "EKOSYS Hospital Planning Unit",
      role: "Hospital Architect & Ergonomics Specialist",
      department: "Facility Planning"
    },
    reviewer: {
      name: "Biomedical Standards Committee",
      role: "Senior Clinical Engineer"
    },
    intro: "Hospital furniture forms the physical backbone of patient care delivery. Planning institutional furniture requirements requires balancing patient ergonomic dignity, clinical nursing efficiency, strict disinfection resilience, and lifetime maintenance costs.",
    sections: [
      {
        heading: "1. Ward Furniture Allocation Ratios",
        content: "Standard institutional procurement ratios for a 100-bed acute care hospital:",
        keyPoints: [
          "Patient Beds: 100 primary beds (15% ICU 5-function, 35% Fowler 2-function, 50% Semi-Fowler).",
          "Bedside Cabinets: 1 unit per patient bed with integrated pull-out drawer and bottle holder.",
          "Overbed Tables: 1 height-adjustable gas-spring table per bed for patient nutrition and therapy.",
          "Saline IV Stands: 1.2 stands per bed with heavy four-hook stainless steel pole and weighted base.",
          "Mobile Screens: 1 four-panel folding screen per 4 general ward beds for privacy."
        ]
      },
      {
        heading: "2. Stainless Steel Grade Selection: AISI 304 vs 201",
        content: "Hospital holloware, surgical trolleys, and scrub units must strictly utilize Austenitic Stainless Steel AISI 304 (18/8 chromium-nickel). Lower-grade alloys like SS 201 deteriorate and rust rapidly when exposed to chlorine-based hospital bleach and enzymatic sterilizing agents."
      }
    ],
    relatedCategorySlugs: ["hospital-medical-furniture", "hospital-holloware"],
    relatedSubcategorySlugs: [
      { catSlug: "hospital-medical-furniture", subSlug: "bedside-cabinets", name: "Bedside Cabinets" },
      { catSlug: "hospital-medical-furniture", subSlug: "overbed-tables", name: "Overbed Tables" },
      { catSlug: "hospital-medical-furniture", subSlug: "trolley", name: "Trolley" }
    ],
    faqs: [
      {
        question: "What coating process is best for hospital steel furniture frames?",
        answer: "Electrostatic epoxy polyester powder coating applied at 60-80 microns thickness after seven-stage chemical degreasing, phosphating, and de-rusting ensures maximum impact resistance and hygiene."
      }
    ]
  },
  {
    id: "guide-5",
    slug: "laboratory-equipment-selection-guide",
    title: "Clinical Laboratory Equipment Selection Guide: Centrifuges, Sterilizers & Analytical Workstations",
    subtitle: "A technical evaluation guide for equipping pathology laboratories, blood banks, and diagnostic testing centers.",
    metaDescription: "Clinical pathology lab equipment selection guide detailing clinical centrifuges, high-pressure autoclaves, microtomes, and laboratory water baths.",
    category: "Laboratory Science",
    readTime: "7 min read",
    datePublished: "2024-12-28",
    dateModified: "2025-02-15",
    author: {
      name: "EKOSYS Diagnostic Technical Group",
      role: "Pathology Equipment Engineer",
      department: "Laboratory Systems"
    },
    reviewer: {
      name: "Quality Assurance Directorate",
      role: "IVD Regulatory Specialist"
    },
    intro: "Accurate clinical pathology requires analytical repeatability and robust sample integrity. Equipping a modern diagnostic pathology lab requires evaluating centrifugal separation, sterile containment, precise thermal incubation, and tissue sectioning.",
    sections: [
      {
        heading: "1. Clinical Centrifuges: Speed, RCF & Thermal Control",
        content: "Centrifugation protocols depend on Relative Centrifugal Force (RCF), not just RPM. Clinical laboratories require maintenance-free brushless induction motors capable of gentle 3,000 RPM (blood separation) to high-speed 16,000 RPM (microhematocrit and molecular assays) with imbalance detection and lid safety interlocks."
      },
      {
        heading: "2. Sterilization Standards: Class B Fractionated Vacuum",
        content: "For laboratory autoclaves and CSSD reprocessing, Class B pre-vacuum autoclaves extract air in multiple pulses before injecting saturated steam at 134°C (2.2 bar pressure). This ensures total steam penetration into hollow instruments, pipettes, and porous diagnostic media."
      }
    ],
    relatedCategorySlugs: ["laboratory-products", "autoclave-sterilizers"],
    relatedSubcategorySlugs: [
      { catSlug: "laboratory-products", subSlug: "centrifuge", name: "Centrifuge" },
      { catSlug: "autoclave-sterilizers", subSlug: "pressure-steam-sterilizers", name: "Pressure Steam Sterilizers" },
      { catSlug: "laboratory-products", subSlug: "microscopes", name: "Microscopes" }
    ],
    faqs: [
      {
        question: "How do you calculate RCF from RPM in laboratory centrifuges?",
        answer: "RCF (g-force) = 1.118 × 10⁻⁵ × r × (RPM)², where r is the rotor radius in centimeters."
      }
    ]
  },
  {
    id: "guide-6",
    slug: "medical-equipment-procurement-guide-india",
    title: "Medical Equipment Procurement Guide in India: Hospital Tenders, ISO 13485 & GeM Guidelines",
    subtitle: "An institutional guide on navigating hospital equipment tenders, regulatory accreditations, and supply chain logistics across India.",
    metaDescription: "Complete guide to hospital equipment procurement in India covering institutional tender specifications, GeM compliance, ISO 13485:2016, and warranty standards.",
    category: "Healthcare Procurement",
    readTime: "8 min read",
    datePublished: "2025-01-15",
    dateModified: "2025-02-20",
    author: {
      name: "EKOSYS Commercial & Tenders Directorate",
      role: "Head of Institutional Tenders",
      department: "National Healthcare Procurement"
    },
    reviewer: {
      name: "Legal & Regulatory Compliance Directorate",
      role: "Medical Device Regulatory Advisor"
    },
    intro: "Procuring capital medical equipment for hospitals in India—whether for government healthcare tenders, private hospital chains, or district healthcare missions—requires clear technical benchmarking, regulatory verification, and transparent commercial warranties.",
    sections: [
      {
        heading: "1. Key Regulatory Accreditations in Indian Healthcare",
        content: "When evaluating manufacturers in India, ensure verified compliance:",
        keyPoints: [
          "ISO 13485:2016: The global quality management system standard dedicated specifically to medical device design and manufacturing.",
          "ISO 9001:2015: Baseline organizational quality management system.",
          "CE Marking (Directive 93/42/EEC / MDR 2017/745): Confirms medical electrical safety and performance conformity.",
          "Star Export House: Government of India recognized export certification validating sustained international trade credibility."
        ]
      },
      {
        heading: "2. GeM (Government e-Marketplace) & Hospital Tenders",
        content: "Institutional tenders require accurate BOQ (Bill of Quantities) documentation, compliance sheets demonstrating clause-by-clause conformity with tender specs, factory inspection authorizations, and performance bank guarantees (PBG)."
      },
      {
        heading: "3. Warranty, Spare Parts Availability & AMC Terms",
        content: "Institutional procurement agreements should mandate a minimum 12-month comprehensive warranty, guaranteed 5-to-7 year spare parts availability, maximum 48-hour service response time, and structured Annual Maintenance Contracts (AMC)."
      }
    ],
    relatedCategorySlugs: ["hospital-medical-furniture", "icu-equipment", "ot-tables"],
    relatedSubcategorySlugs: [
      { catSlug: "hospital-medical-furniture", subSlug: "icu-beds", name: "ICU Beds" },
      { catSlug: "icu-equipment", subSlug: "patient-monitors", name: "Patient Monitors" },
      { catSlug: "ot-tables", subSlug: "c-arm-compatible-tables", name: "C-Arm Compatible Tables" }
    ],
    faqs: [
      {
        question: "Can EKOSYS provide custom BOQ estimations for hospital expansion projects?",
        answer: "Yes, our engineering desk provides customized turnkey Bill of Quantities (BOQ) estimations and tender technical compliance sheets for hospitals and government tenders within 24 to 48 hours."
      }
    ]
  }
];

export function getAllBuyerGuides(): BuyerGuide[] {
  return buyerGuides;
}

export function getBuyerGuideBySlug(slug: string): BuyerGuide | undefined {
  return buyerGuides.find(g => g.slug === slug);
}
