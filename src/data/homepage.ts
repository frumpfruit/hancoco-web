// ============================================================
// HANCOCO — Static Data Layer (Phase 1, pre-CMS)
// Will be replaced by Sanity GROQ queries in Phase 2
// ============================================================

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameId: string;
  category: string;
  shortDescription: string;
  shortDescriptionId: string;
  applications: string[];
  exportReady: boolean;
  status: "active" | "coming_soon";
  gradient: string;
  image?: string;
};

export type Certification = {
  id: string;
  name: string;
  status: "available" | "coming_soon";
  body: string;
};

export type Metric = {
  id: string;
  value: string;
  label: string;
  labelId: string;
  sublabel?: string;
};

export type JourneyMilestone = {
  year: string;
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
  image?: string;
};

export type EcoStep = {
  num: string;
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
};

export type QaStep = {
  num: string;
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
  image?: string;
};

export type Partner = {
  name: string;
  size: "lg" | "md" | "sm";
  href: string;
  description: string;
  image?: string;
};

export type Insight = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  featured: boolean;
  image?: string;
};

// ─────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────
export const products: Product[] = [
  {
    id: "white-copra",
    slug: "white-copra",
    name: "White Copra",
    nameId: "White Copra",
    category: "Copra",
    shortDescription:
      "High-grade dried coconut meat with low moisture content, ideal for coconut oil extraction and food processing.",
    shortDescriptionId:
      "Daging kelapa kering berkualitas tinggi dengan kadar air rendah, ideal untuk ekstraksi minyak kelapa dan industri pangan.",
    applications: ["Coconut Oil Extraction", "Food Manufacturing", "Oleochemical Industry"],
    exportReady: true,
    status: "active",
    gradient: "from-amber-50 to-amber-100",
    image: "/assets/images/pexels-bogdankrupin-3986706.webp",
  },
  {
    id: "black-copra",
    slug: "black-copra",
    name: "Black Copra",
    nameId: "Black Copra",
    category: "Copra",
    shortDescription:
      "Traditional smoke-dried copra with robust moisture retention, widely used in industrial oil milling.",
    shortDescriptionId:
      "Kopra tradisional berproses asap dengan retensi kelembapan kuat, digunakan luas dalam penggilingan minyak industri.",
    applications: ["Industrial Oil Milling", "Animal Feed", "Soap Manufacturing"],
    exportReady: true,
    status: "active",
    gradient: "from-stone-100 to-stone-200",
    image: "/assets/images/pexels-boris-lvrg-217419519-11865882.webp",
  },
  {
    id: "coconut-charcoal",
    slug: "coconut-charcoal",
    name: "Coconut Shell Charcoal",
    nameId: "Arang Tempurung Kelapa",
    category: "Charcoal",
    shortDescription:
      "Premium activated charcoal from coconut shell — superior hardness, high fixed carbon content for hookah, BBQ, and industrial filtration.",
    shortDescriptionId:
      "Arang aktif premium dari tempurung kelapa — kekerasan superior, kandungan karbon tetap tinggi untuk hookah, BBQ, dan filtrasi industri.",
    applications: ["Hookah & Shisha", "BBQ & Grilling", "Water Filtration", "Air Purification"],
    exportReady: true,
    status: "active",
    gradient: "from-zinc-200 to-zinc-300",
    image: "/assets/images/pexels-cmrcn-29132448.webp",
  },
  {
    id: "coconut-oil",
    slug: "coconut-oil",
    name: "Coconut Oil (RBD)",
    nameId: "Minyak Kelapa (RBD)",
    category: "Oil",
    shortDescription:
      "Refined, bleached, and deodorized coconut oil — food-grade purity for culinary, cosmetic, and pharmaceutical applications.",
    shortDescriptionId:
      "Minyak kelapa refined, bleached, dan deodorized — kemurnian food-grade untuk aplikasi kuliner, kosmetik, dan farmasi.",
    applications: ["Food & Beverage", "Cosmetic & Personal Care", "Pharmaceutical"],
    exportReady: true,
    status: "active",
    gradient: "from-yellow-50 to-yellow-100",
    image: "/assets/images/towfiqu-barbhuiya-o3Dunr7Vl-o-unsplash.webp",
  },
];

// ─────────────────────────────────────────
// CERTIFICATIONS (Single source of truth)
// ─────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: "halal",
    name: "Halal Certified",
    status: "available",
    body: "MUI Indonesia",
  },
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    status: "coming_soon",
    body: "Quality Management System",
  },
  {
    id: "haccp",
    name: "HACCP",
    status: "coming_soon",
    body: "Food Safety System",
  },
  {
    id: "gmp",
    name: "GMP",
    status: "coming_soon",
    body: "Good Manufacturing Practice",
  },
  {
    id: "bpom",
    name: "BPOM",
    status: "coming_soon",
    body: "Badan Pengawas Obat dan Makanan",
  },
];

// ─────────────────────────────────────────
// AT A GLANCE METRICS
// ─────────────────────────────────────────
export const metrics: Metric[] = [
  { id: "founded", value: "2020", label: "Founded", labelId: "Didirikan" },
  { id: "products", value: "4+", label: "Core Products", labelId: "Produk Utama" },
  { id: "markets", value: "15+", label: "Export Markets", labelId: "Pasar Ekspor" },
  { id: "capacity", value: "500T", label: "Monthly Capacity", labelId: "Kapasitas Bulanan", sublabel: "metric tons" },
  {
    id: "partners",
    value: "30+",
    label: "B2B Partners",
    labelId: "Mitra B2B",
  },
];

// ─────────────────────────────────────────
// INTEGRATED ECOSYSTEM STEPS
// ─────────────────────────────────────────
export const ecoSteps: EcoStep[] = [
  {
    num: "01",
    title: "Farmer Partnership",
    titleId: "Kemitraan Petani",
    description: "Direct sourcing from trusted coconut farmers across Indonesia's productive regions.",
    descriptionId: "Pengadaan langsung dari petani kelapa terpercaya di sentra produksi Indonesia.",
  },
  {
    num: "02",
    title: "Raw Material Selection",
    titleId: "Seleksi Bahan Baku",
    description: "Rigorous quality inspection at point of origin — only the best coconuts enter our supply chain.",
    descriptionId: "Inspeksi kualitas ketat di titik asal — hanya kelapa terbaik yang masuk rantai pasokan kami.",
  },
  {
    num: "03",
    title: "Processing & Manufacturing",
    titleId: "Pengolahan & Manufaktur",
    description: "State-of-the-art processing facility with modern machinery for consistent output.",
    descriptionId: "Fasilitas pengolahan mutakhir dengan mesin modern untuk hasil yang konsisten.",
  },
  {
    num: "04",
    title: "Quality Assurance",
    titleId: "Jaminan Kualitas",
    description: "7-stage QC protocol — from incoming inspection to final product certification.",
    descriptionId: "Protokol QC 7 tahap — dari inspeksi masuk hingga sertifikasi produk akhir.",
  },
  {
    num: "05",
    title: "Sustainable Packaging",
    titleId: "Pengemasan Berkelanjutan",
    description: "Eco-conscious packaging solutions meeting international export standards.",
    descriptionId: "Solusi pengemasan ramah lingkungan yang memenuhi standar ekspor internasional.",
  },
  {
    num: "06",
    title: "Export & Logistics",
    titleId: "Ekspor & Logistik",
    description: "Reliable shipping via major Indonesian ports — FOB, CIF, CFR terms available.",
    descriptionId: "Pengiriman andal melalui pelabuhan utama Indonesia — tersedia term FOB, CIF, CFR.",
  },
  {
    num: "07",
    title: "Global Customer",
    titleId: "Pelanggan Global",
    description: "Delivering consistent quality to manufacturers and importers across 15+ countries.",
    descriptionId: "Menghadirkan kualitas konsisten ke manufaktur dan importir di 15+ negara.",
  },
];

// ─────────────────────────────────────────
// QUALITY ASSURANCE STEPS
// ─────────────────────────────────────────
export const qaSteps: QaStep[] = [
  {
    num: "01",
    title: "Incoming Material Inspection",
    titleId: "Inspeksi Material Masuk",
    description: "Every incoming batch is tested for moisture, contamination, and compliance before entering production.",
    descriptionId: "Setiap batch masuk diuji kadar air, kontaminasi, dan kepatuhan sebelum memasuki produksi.",
    image: "/assets/images/pexels-quang-nguyen-vinh-222549-8280856.webp"
  },
  {
    num: "02",
    title: "In-Process Monitoring",
    titleId: "Pemantauan Proses",
    description: "Real-time temperature, humidity, and process parameter monitoring throughout production.",
    descriptionId: "Pemantauan suhu, kelembapan, dan parameter proses secara real-time selama produksi.",
    image: "/assets/images/pexels-ayomide-isaac-66354580-12392906.webp"
  },
  {
    num: "03",
    title: "Laboratory Analysis",
    titleId: "Analisis Laboratorium",
    description: "On-site lab tests for physical, chemical, and microbiological compliance per batch.",
    descriptionId: "Uji laboratorium di lokasi untuk kepatuhan fisika, kimia, dan mikrobiologi per batch.",
    image: "/assets/images/pexels-picasjoe-11402585.webp"
  },
  {
    num: "04",
    title: "Standardization & Grading",
    titleId: "Standarisasi & Grading",
    description: "Products are graded and classified by quality tier before packaging and dispatch.",
    descriptionId: "Produk dikelompokkan dan diklasifikasikan berdasarkan tingkatan kualitas sebelum pengemasan.",
    image: "/assets/images/pexels-boris-lvrg-217419519-11865861.webp"
  },
  {
    num: "05",
    title: "Pre-Shipment Inspection",
    titleId: "Inspeksi Pra-Pengiriman",
    description: "Independent third-party verification available. All export documents prepared and verified.",
    descriptionId: "Verifikasi pihak ketiga independen tersedia. Semua dokumen ekspor disiapkan dan diverifikasi.",
    image: "/assets/images/pre-shipment.webp"
  },
  {
    num: "06",
    title: "Export Documentation",
    titleId: "Dokumentasi Ekspor",
    description: "Complete documentation: CoA, Packing List, Certificate of Origin, Bill of Lading.",
    descriptionId: "Dokumentasi lengkap: CoA, Packing List, Certificate of Origin, Bill of Lading.",
    image: "/assets/images/export-document.webp"
  },
  {
    num: "07",
    title: "Continuous Improvement",
    titleId: "Perbaikan Berkelanjutan",
    description: "Feedback loops from buyers integrated into our quality improvement cycle.",
    descriptionId: "Umpan balik dari buyer diintegrasikan ke dalam siklus peningkatan kualitas kami.",
    image: "/assets/images/pexels-sarah-claude-levesque-st-louis-156920272-13525909.webp"
  },
];

// ─────────────────────────────────────────
// OUR JOURNEY MILESTONES
// ─────────────────────────────────────────
export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2020",
    title: "HANCOCO Was Founded",
    titleId: "HANCOCO Didirikan",
    description: "Established with a vision to transform every part of the coconut into sustainable economic value.",
    descriptionId: "Didirikan dengan visi mengubah setiap bagian kelapa menjadi nilai ekonomi yang berkelanjutan.",
    image: "/assets/images/pexels-cottonbro-4631075.webp",
  },
  {
    year: "2021",
    title: "First Export Shipment",
    titleId: "Pengiriman Ekspor Pertama",
    description: "Achieved first international B2B export — White Copra to Southeast Asian markets.",
    descriptionId: "Mencapai ekspor B2B internasional pertama — White Copra ke pasar Asia Tenggara.",
    image: "/assets/images/pexels-cottonbro-5608055.webp",
  },
  {
    year: "2022",
    title: "Manufacturing Expansion",
    titleId: "Ekspansi Manufaktur",
    description: "Expanded processing capacity and launched Coconut Shell Charcoal as a new product line.",
    descriptionId: "Memperluas kapasitas pengolahan dan meluncurkan Arang Tempurung Kelapa sebagai lini produk baru.",
    image: "/assets/images/heroimage22.webp",
  },
  {
    year: "2023",
    title: "Halal Certification",
    titleId: "Sertifikasi Halal",
    description: "Secured MUI Halal certification, opening doors to Middle Eastern and global Muslim markets.",
    descriptionId: "Memperoleh sertifikasi Halal MUI, membuka akses ke pasar Timur Tengah dan Muslim global.",
    image: "/assets/images/nisha-ramesh-IiiTDxnHDzg-unsplash.webp",
  },
  {
    year: "2024",
    title: "15+ Export Markets",
    titleId: "15+ Pasar Ekspor",
    description: "Grew our international buyer network to 15+ countries across Asia, Middle East, and Europe.",
    descriptionId: "Mengembangkan jaringan buyer internasional ke 15+ negara di Asia, Timur Tengah, dan Eropa.",
    image: "/assets/images/pexels-nati-87264186-26699770.webp",
  },
  {
    year: "2025",
    title: "Coconut Oil (RBD) Launch",
    titleId: "Peluncuran Minyak Kelapa (RBD)",
    description: "Launched refined coconut oil production, completing our 4-product integrated ecosystem.",
    descriptionId: "Meluncurkan produksi minyak kelapa refined, melengkapi ekosistem terintegrasi 4 produk kami.",
    image: "/assets/images/irene-kredenets-E95Lpkg-bgc-unsplash.webp",
  },
  {
    year: "Future",
    title: "Towards ISO & Global Scale",
    titleId: "Menuju ISO & Skala Global",
    description: "Pursuing ISO 9001 & HACCP certification. Expanding to VCO, Desiccated Coconut, and more.",
    descriptionId: "Mengejar sertifikasi ISO 9001 & HACCP. Ekspansi ke VCO, Desiccated Coconut, dan lebih banyak lagi.",
    image: "/assets/images/iso.webp",
  },
];

// ─────────────────────────────────────────
// PARTNERS / PARTNER TARGET VERTICALS
// ─────────────────────────────────────────
export const partnerVerticals: Partner[] = [
  { name: "Coconut Commodity Traders", size: "lg", href: "#rfq", description: "Partner with us for a consistent, export-ready supply of premium copra, charcoal, and coconut oil.", image: "/assets/images/shibi-zidhick-DES_XhqBU2E-unsplash.webp" },
  { name: "Shisha Charcoal Wholesalers", size: "lg", href: "#rfq", description: "Distribute our premium coconut shell charcoal, renowned for its long-lasting burn, zero sparks, and white ash.", image: "/assets/images/aleksey-kuprikov-c-AXdFRil_w-unsplash.webp" },
  { name: "Copra Oil Mills", size: "md", href: "#rfq", description: "Source our high-yield White and Black Copra for large-scale extraction of industrial and edible coconut oils.", image: "/assets/images/sri-lanka-0nH_OVirQSg-unsplash.webp" },
  { name: "Natural Skincare Formulators", size: "md", href: "#rfq", description: "Formulate your premium beauty and personal care lines with our pure, pharmaceutical-grade RBD Coconut Oil.", image: "/assets/images/towfiqu-barbhuiya-vuctv0AnlwY-unsplash.webp" },
  { name: "BBQ Charcoal Distributors", size: "md", href: "#rfq", description: "Elevate the outdoor grilling market with our sustainable, high-heat, and low-smoke coconut charcoal briquettes.", image: "/assets/images/peter-fogden-toB7tKXne7U-unsplash.webp" },
  { name: "Food & Baking Industries", size: "lg", href: "#rfq", description: "Integrate our pure RBD coconut oil and edible white copra into mass-scale culinary, baking, and vegan food production.", image: "/assets/images/tijana-drndarski-BNZrKnocA3c-unsplash.webp" },
  { name: "Oleochemical Plants", size: "sm", href: "#rfq", description: "Procure our robust industrial-grade copra as a reliable raw material base for soaps, detergents, and derivatives.", image: "/assets/images/towfiqu-barbhuiya-o3Dunr7Vl-o-unsplash.webp" },
  { name: "Activated Carbon Manufacturers", size: "sm", href: "#rfq", description: "Process our dense coconut shells into highly porous activated carbon for advanced water and air filtration systems.", image: "/assets/images/engin-akyurt-1g3fkv6t23M-unsplash.webp" },
  { name: "Livestock Feed Producers", size: "sm", href: "#rfq", description: "Utilize the nutrient-rich expeller cake byproduct from our copra milling process for high-quality animal feed.", image: "/assets/images/kateryna-ivanova-KQSedNnCFvk-unsplash.webp" },
  { name: "Pharmaceutical Bases", size: "sm", href: "#rfq", description: "Access our strictly standardized, food-safe coconut oil for medicinal supplement formulations and carrier oils.", image: "/assets/images/hector-john-periquin-zWn9bXRq2-U-unsplash.webp" },
];

// ─────────────────────────────────────────
// INSIGHTS / NEWS (Sample)
// ─────────────────────────────────────────
export const insights: Insight[] = [
  {
    id: "1",
    slug: "global-coconut-charcoal-market-2025",
    category: "Market Intelligence",
    title: "Global Coconut Charcoal Market: Demand Surge from Middle East & Europe",
    excerpt:
      "Hookah culture expansion and eco-BBQ trends are driving unprecedented demand for premium coconut shell charcoal. Here's what buyers need to know.",
    readTime: "6 min read",
    date: "Jul 12, 2026",
    featured: true,
    image: "/assets/images/rusty-watson-W8P1WeOU1XI-unsplash.webp",
  },
  {
    id: "2",
    slug: "white-copra-export-guide",
    category: "Export Knowledge",
    title: "White Copra Export Guide: Standards, Documentation & Incoterms",
    excerpt:
      "A practical guide for B2B buyers navigating white copra procurement from Indonesia — from quality specs to port logistics.",
    readTime: "8 min read",
    date: "Jul 5, 2026",
    featured: false,
    image: "/assets/images/teodor-kuduschiev-wWjlfmxXPoE-unsplash.webp",
  },
  {
    id: "3",
    slug: "circular-economy-coconut",
    category: "Sustainability",
    title: "Nothing Wasted: The Circular Economy of an Indonesian Coconut",
    excerpt:
      "From meat to shell to husk — how HANCOCO's integrated model ensures every part of the coconut generates sustainable value.",
    readTime: "5 min read",
    date: "Jun 28, 2026",
    featured: false,
    image: "/assets/images/dipesh-ray-kngFBByxsvw-unsplash.webp",
  },
  {
    id: "4",
    slug: "rbd-coconut-oil-applications",
    category: "Product Insights",
    title: "RBD Coconut Oil: Industrial Applications Beyond the Kitchen",
    excerpt:
      "Refined coconut oil's versatility spans cosmetics, pharmaceuticals, and oleochemicals. A deep dive for procurement teams.",
    readTime: "7 min read",
    date: "Jun 20, 2026",
    featured: false,
    image: "/assets/images/feng-shan-15-dLesZL9Q-unsplash.webp",
  },
];

// ─────────────────────────────────────────
// RESEARCH & INNOVATION — Future Pipeline
// ─────────────────────────────────────────
export const innovationPipeline = [
  { label: "VCO (Virgin Coconut Oil)", status: "now" },
  { label: "Desiccated Coconut", status: "now" },
  { label: "Coconut Fiber (Coir)", status: "near" },
  { label: "Coconut Sugar", status: "near" },
  { label: "Coconut Water Powder", status: "near" },
  { label: "Coconut Shell Activated Carbon", status: "future" },
  { label: "Coconut Husk Briquettes", status: "future" },
  { label: "Coconut Shell Flour", status: "future" },
  { label: "Coconut Milk Powder", status: "future" },
  { label: "Bioplastics from Coconut", status: "future" },
] as const;

// ─────────────────────────────────────────
// WHY HANCOCO — 8 Differentiators
// ─────────────────────────────────────────
export const differentiators = [
  {
    id: "integrated",
    title: "Fully Integrated",
    description: "Farm to export — no middlemen, full traceability.",
    size: "tall",
    image: "/assets/images/manufacturing-5.webp",
  },
  {
    id: "quality",
    title: "7-Stage QC Protocol",
    description: "Every batch laboratory-tested before shipment.",
    size: "normal",
    image: "/assets/images/pexels-towfiqu-barbhuiya-3440682-11921158.jpg",
  },
  {
    id: "export",
    title: "Export Ready",
    description: "All 4 products cleared for international B2B export.",
    size: "wide",
    image: "/assets/images/pexels-salah-ozil-78566588-29415944.webp",
  },
  {
    id: "halal",
    title: "Halal Certified",
    description: "MUI certified — accepted in 50+ Muslim-majority markets.",
    size: "normal",
    image: "/assets/images/pexels-pixabay-48884.webp",
  },
  {
    id: "sustainable",
    title: "Zero-Waste Model",
    description: "Every coconut part utilized. Nothing wasted.",
    size: "normal",
    image: "/assets/images/nipanan-lifestyle-pV2xU2rP580-unsplash.webp",
  },
  {
    id: "capacity",
    title: "500T / Month",
    description: "Production capacity to support your scaling needs.",
    size: "normal",
    image: "/assets/images/pexels-cottonbro-5608057.webp",
  },
  {
    id: "farmers",
    title: "Farmer-First",
    description: "Direct partnerships with 200+ coconut farming families.",
    size: "wide",
    image: "/assets/images/diana-nazarchuk-oIR-PrUuFas-unsplash.webp",
  },
  {
    id: "responsive",
    title: "Fast RFQ Response",
    description: "Dedicated sales team responds within 24 business hours.",
    size: "normal",
    image: "/assets/images/exporting-2.webp",
  },
] as const;
