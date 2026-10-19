/* eslint-disable */
/*
 * Product data for redesign-v2.
 * Public-facing rules (per project brief):
 *   - No internal codes (M-XX / MIN-XX / F-XX) shown to the public.
 *   - No "Global Sourcing" placeholder: rows without an origin on file
 *     simply omit the origin column.
 *   - No fabricated grades, units, dimensions, or fuel parameters that
 *     are not present in the source research.
 *   - No research footnotes ("source PDF lists …", "meaning unconfirmed")
 *     leak into the public surface; if a spec is not on file we omit it.
 *   - 16 lines, 5 families (metals, minerals, energy-chemicals,
 *     fertilizers, agricultural). Identity is by family + order number.
 */

window.QY_PRODUCTS = [
  // ----- METALS (5) -----
  {
    id: "copper-cathode",
    order: 1,
    group: "metals",
    name: {
      zh: "阴极电解铜",
      en: "Cathode Electrolytic Copper",
    },
    subtitle: {
      zh: "高纯阴极铜板 · 捆装交付",
      en: "High-purity cathode sheets, strapped bundles",
    },
    specs: [
      { k: { zh: "纯度", en: "Purity" }, v: { zh: "99.97% – 99.99%", en: "99.97% – 99.99%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "阴极铜板", en: "Cathode sheets" } },
    ],
    image: "assets/products/imp_p08_copper_cathode_unreg_01.jpeg",
    origin: null,
    blurb:
      "High-purity cathode copper for industrial feedstock. Delivered as strapped bundles, ready for downstream refining and fabrication.",
  },
  {
    id: "aluminum",
    order: 2,
    group: "metals",
    name: {
      zh: "标铝",
      en: "Standard Aluminum",
    },
    subtitle: {
      zh: "非注册品牌 · 捆装铝锭与 T 型条",
      en: "Non-registered, green-banded ingots and T-bars",
    },
    specs: [
      { k: { zh: "形态", en: "Form" }, v: { zh: "铝锭 / T 型条 / 母锭", en: "Ingots / T-Bars / Sows" } },
      { k: { zh: "包装", en: "Packing" }, v: { zh: "绿带捆扎", en: "Green-banded bundles" } },
    ],
    image: "assets/products/imp_p08_aluminum_standard_unreg_02.jpeg",
    origin: null,
    blurb:
      "Standard aluminium ingots and T-bars, supplied as strapped packs of common aluminium.",
  },
  {
    id: "gold-pellets",
    order: 3,
    group: "metals",
    name: {
      zh: "金豆",
      en: "Gold Pellets",
    },
    subtitle: {
      zh: "颗粒状黄金 · 香港交货条款",
      en: "Granular gold · Hong Kong delivery terms",
    },
    specs: [
      { k: { zh: "含金量", en: "Gold content" }, v: { zh: "≥ 90%", en: "≥ 90%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "颗粒状", en: "Granular" } },
    ],
    image: "assets/products/imp_p09_gold_pellet_05.jpeg",
    origin: null,
    blurb:
      "Granular gold pellets for refining and bullion production. Hong Kong delivery terms noted in source.",
  },
  {
    id: "gold-bullion",
    order: 4,
    group: "metals",
    name: {
      zh: "金块",
      en: "Gold Bullion",
    },
    subtitle: {
      zh: "金条 · 香港结算与金库物流",
      en: "Bullion bars · Hong Kong settlement and vault logistics",
    },
    specs: [
      { k: { zh: "纯度", en: "Purity" }, v: { zh: "≥ 95% Au", en: "≥ 95% Au" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "金块", en: "Bullion bar" } },
    ],
    image: "assets/products/imp_p09_gold_pellet_05.jpeg",
    origin: null,
    blurb:
      "Refined bullion bars supplied to the Hong Kong desk for international trade and vault logistics.",
  },
  {
    id: "gold-ore",
    order: 5,
    group: "metals",
    name: {
      zh: "金矿砂",
      en: "Gold-Bearing Concentrate",
    },
    subtitle: {
      zh: "含金精粉 · 可国内交货",
      en: "Gold-bearing concentrate, domestic delivery available",
    },
    specs: [
      { k: { zh: "Au 品位", en: "Au grade" }, v: { zh: "12% – 40%", en: "12% – 40%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "精粉 / 矿砂", en: "Concentrate / ore sand" } },
    ],
    image: "assets/products/imp_p09_gold_pellet_05.jpeg",
    origin: null,
    blurb:
      "Gold-bearing concentrate supplied for further refining. Domestic mainland delivery terms available.",
  },

  // ----- MINERALS (4) -----
  {
    id: "scheelite",
    order: 6,
    group: "minerals",
    name: {
      zh: "白钨精粉",
      en: "Scheelite Concentrate",
    },
    subtitle: {
      zh: "白钨矿粉 · 供工业深加工",
      en: "White tungsten ore for industrial processors",
    },
    specs: [
      { k: { zh: "WO₃ 含量", en: "WO₃ content" }, v: { zh: "65%", en: "65%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "黄白色粉末", en: "Pale-yellow powder" } },
    ],
    image: "assets/products/imp_p10_tungsten_scheelite_wolframite_01.jpeg",
    origin: null,
    blurb:
      "White tungsten concentrate supplied to industrial processors. Granular form, ready for further smelting.",
  },
  {
    id: "wolframite",
    order: 7,
    group: "minerals",
    name: {
      zh: "黑钨精粉",
      en: "Wolframite Concentrate",
    },
    subtitle: {
      zh: "黑钨矿 · 灰色颗粒",
      en: "Black tungsten ore, grey granules",
    },
    specs: [
      { k: { zh: "WO₃ 含量", en: "WO₃ content" }, v: { zh: "48% – 62%", en: "48% – 62%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "灰色颗粒", en: "Grey granules" } },
    ],
    image: "assets/products/imp_p10_tungsten_scheelite_wolframite_02.jpeg",
    origin: null,
    blurb:
      "Black tungsten concentrate for industrial tungsten processors. Granular form, ready for further smelting.",
  },
  {
    id: "bauxite",
    order: 8,
    group: "minerals",
    name: {
      zh: "铝矾土",
      en: "Bauxite",
    },
    subtitle: {
      zh: "红土铝矾土 · 印尼及西非",
      en: "Laterite bauxite, Indonesia and West Africa",
    },
    specs: [
      { k: { zh: "Al₂O₃ 含量", en: "Al₂O₃ content" }, v: { zh: "45% – 48%", en: "45% – 48%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "原矿 / 红土矿", en: "Run-of-mine / laterite ore" } },
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "印度尼西亚 / 几内亚", en: "Indonesia / Guinea" } },
    ],
    image: "assets/products/imp_p12_bauxite_01.jpeg",
    origin: { zh: "印度尼西亚 / 几内亚", en: "Indonesia / Guinea" },
    blurb:
      "Bauxite ore sourced for downstream alumina refining. Bulk origin: Indonesia and Guinea.",
  },
  {
    id: "copper-ore",
    order: 9,
    group: "minerals",
    name: {
      zh: "铜矿 / 铜精矿",
      en: "Copper Ore & Concentrate",
    },
    subtitle: {
      zh: "铜矿与精粉 · 多国来源",
      en: "Copper ore and concentrate, multi-origin",
    },
    specs: [
      { k: { zh: "Cu 含量", en: "Cu content" }, v: { zh: "20% – 40%", en: "20% – 40%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "原矿 / 精粉 / 编织袋装", en: "Run-of-mine / concentrate / bagged" } },
      { k: { zh: "来源地", en: "Origins" }, v: { zh: "亚洲 / 非洲 / 大洋洲 / 北美", en: "Asia / Africa / Oceania / North America" } },
    ],
    image: "assets/products/imp_p13_copper_ore_concentrate_07.jpeg",
    origin: { zh: "多国来源", en: "Multi-origin" },
    blurb:
      "Copper ore and concentrate for smelters and traders. Origins span Asia, Africa, Oceania and North America.",
  },

  // ----- ENERGY & CHEMICALS (2) -----
  {
    id: "sulfur",
    order: 10,
    group: "energy-chemicals",
    name: {
      zh: "工业硫磺",
      en: "Industrial Sulfur",
    },
    subtitle: {
      zh: "固体硫磺 · 化工与食品防腐",
      en: "Solid sulphur for chemicals, dyes and food preservation",
    },
    specs: [
      { k: { zh: "纯度", en: "Purity" }, v: { zh: "99.95%", en: "99.95%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "块 / 粉 / 颗粒 / 片", en: "Block / Powder / Granular / Flake" } },
      { k: { zh: "用途", en: "Use" }, v: { zh: "化工 / 农药 / 染料 / 造纸 / 食品防腐", en: "Chemical / Pesticide / Dye / Paper / Food preservation" } },
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "中亚 / 中东 / 北美", en: "Central Asia / Middle East / North America" } },
    ],
    image: "assets/products/imp_p11_industrial_sulfur_02.jpeg",
    origin: { zh: "中亚 / 中东 / 北美", en: "Central Asia / Middle East / North America" },
    blurb:
      "Solid industrial sulphur at 99.95% purity for chemicals, pesticides, dyes, paper, and food-preservation applications.",
  },
  {
    id: "steam-coal",
    order: 11,
    group: "energy-chemicals",
    name: {
      zh: "印尼动力煤",
      en: "Indonesian Steam Coal",
    },
    subtitle: {
      zh: "CIF 中国指定港口 · DLC 付款",
      en: "CIF designated Chinese ports · DLC terms",
    },
    specs: [
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "印度尼西亚", en: "Indonesia" } },
      { k: { zh: "品种", en: "Variety" }, v: { zh: "动力煤（蒸汽煤）", en: "Steam (thermal) coal" } },
      { k: { zh: "交货", en: "Delivery" }, v: { zh: "CIF 中国指定港口 · DLC 付款", en: "CIF designated Chinese ports · DLC" } },
    ],
    image: "assets/products/imp_p15_indonesian_steam_coal_01.jpeg",
    origin: { zh: "印度尼西亚", en: "Indonesia" },
    blurb:
      "Indonesian steam coal supplied on CIF China terms. Source imagery shows port-side stockyards and loading scenes.",
  },

  // ----- FERTILIZERS (3) -----
  {
    id: "potash-white",
    order: 12,
    group: "fertilizers",
    name: {
      zh: "氯化钾 · 白钾",
      en: "Potassium Chloride — White Standard",
    },
    subtitle: {
      zh: "颗粒氯化钾 · 直接施用与配肥",
      en: "Granular MOP, for direct application and blends",
    },
    specs: [
      { k: { zh: "K₂O 含量", en: "K₂O content" }, v: { zh: "62%", en: "62%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "颗粒", en: "Granular" } },
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "加拿大 / 白俄罗斯 / 东南亚", en: "Canada / Belarus / SE Asia" } },
    ],
    image: "assets/products/imp_p14_potash_fertilizer_01.jpeg",
    origin: { zh: "加拿大 / 白俄罗斯 / 东南亚", en: "Canada / Belarus / SE Asia" },
    blurb:
      "White-standard MOP at 62% K₂O for direct application and blend manufacturing.",
  },
  {
    id: "potash-red",
    order: 13,
    group: "fertilizers",
    name: {
      zh: "氯化钾 · 红钾",
      en: "Potassium Chloride — Red Standard",
    },
    subtitle: {
      zh: "颗粒氯化钾 · 58% K₂O",
      en: "Granular MOP · 58% K₂O",
    },
    specs: [
      { k: { zh: "K₂O 含量", en: "K₂O content" }, v: { zh: "58%", en: "58%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "颗粒", en: "Granular" } },
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "加拿大 / 白俄罗斯 / 东南亚", en: "Canada / Belarus / SE Asia" } },
    ],
    image: "assets/products/imp_p14_potash_fertilizer_02.jpeg",
    origin: { zh: "加拿大 / 白俄罗斯 / 东南亚", en: "Canada / Belarus / SE Asia" },
    blurb:
      "Red-standard MOP at 58% K₂O.",
  },
  {
    id: "potash-powder",
    order: 14,
    group: "fertilizers",
    name: {
      zh: "氯化钾 · 粉钾",
      en: "Potassium Chloride — Powder",
    },
    subtitle: {
      zh: "粉状氯化钾 · 配肥与直接施用",
      en: "Powder-grade MOP for blends and direct application",
    },
    specs: [
      { k: { zh: "K₂O 含量", en: "K₂O content" }, v: { zh: "48%", en: "48%" } },
      { k: { zh: "形态", en: "Form" }, v: { zh: "粉状", en: "Powder" } },
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "加拿大 / 白俄罗斯 / 东南亚", en: "Canada / Belarus / SE Asia" } },
    ],
    image: "assets/products/imp_p14_potash_fertilizer_03.jpeg",
    origin: { zh: "加拿大 / 白俄罗斯 / 东南亚", en: "Canada / Belarus / SE Asia" },
    blurb:
      "Powder-grade MOP at 48% K₂O for compound-fertilizer blending and direct application.",
  },

  // ----- AGRICULTURAL (2) -----
  {
    id: "palm-kernel-cake",
    order: 15,
    group: "agriculture",
    name: {
      zh: "棕榈粕",
      en: "Palm Kernel Cake",
    },
    subtitle: {
      zh: "饲料原料 · 印尼 / 马来西亚",
      en: "Feed ingredient · Indonesia / Malaysia",
    },
    specs: [
      { k: { zh: "形态", en: "Form" }, v: { zh: "粉末", en: "Powder / meal" } },
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "印尼 / 马来西亚", en: "Indonesia / Malaysia" } },
    ],
    image: "assets/products/imp_p16_palm_kernel_cake_01.jpeg",
    origin: { zh: "印尼 / 马来西亚", en: "Indonesia / Malaysia" },
    blurb:
      "Palm kernel cake (PKC) for compound-feed manufacturing.",
  },
  {
    id: "peat",
    order: 16,
    group: "agriculture",
    name: {
      zh: "俄罗斯天然泥炭",
      en: "Russian Natural Peat",
    },
    subtitle: {
      zh: "土壤修复与育苗基质",
      en: "Soil conditioner and seedling substrate",
    },
    specs: [
      { k: { zh: "来源地", en: "Origin" }, v: { zh: "俄罗斯", en: "Russia" } },
      { k: { zh: "用途", en: "Use" }, v: { zh: "土壤修复改良 · 禾苗育苗", en: "Soil remediation · Seedling substrate" } },
    ],
    image: "assets/products/imp_p17_russia_peat_01.jpeg",
    origin: { zh: "俄罗斯", en: "Russia" },
    blurb:
      "Natural Russian peat for soil remediation and seedling substrate.",
  },
];

window.QY_GROUPS = [
  { id: "metals", label: { zh: "金属 · 有色 / 贵金属", en: "Metals & Precious" }, count: 5 },
  { id: "minerals", label: { zh: "矿产品", en: "Minerals" }, count: 4 },
  { id: "energy-chemicals", label: { zh: "能源 / 化工", en: "Energy & Chemicals" }, count: 2 },
  { id: "fertilizers", label: { zh: "农化 · 肥料", en: "Agro · Fertilizer" }, count: 3 },
  { id: "agriculture", label: { zh: "农副产品", en: "Agricultural" }, count: 2 },
];

window.QY_CONTACT = {
  hq: {
    zh: "深圳总部",
    en: "Shenzhen Headquarters",
    address: { zh: "深圳市罗湖区滨河路1011号深城投中心32F", en: "32F, Shenchengtou Center, No. 1011 Binhe Road, Luohu District, Shenzhen" },
  },
  hk: {
    zh: "香港公司",
    en: "Hong Kong Office",
    address: {
      zh: "ROOM 610 TAI SHING IND BLDG, 273-279 UN CHAU ST CHEUNG SHA WAN KL, KOWLOON, HONG KONG",
      en: "ROOM 610 TAI SHING IND BLDG, 273-279 UN CHAU ST CHEUNG SHA WAN KL, KOWLOON, HONG KONG",
    },
  },
  phone: ["400-138-8069", "13825213788", "13823148882"],
  email: ["info@qianyanholding.com", "gang@qianyanholding.com", "Lucy@qianyanholding.com"],
  web: "www.qianyanholding.com",
};
