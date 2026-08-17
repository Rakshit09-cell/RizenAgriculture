export const AGRI_DATABASE = [
  {
    id: 'crop-tomato',
    name: 'Tomato (Solanum lycopersicum)',
    commonName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Fruits & Veggies',
    type: 'Crop / Vegetable',
    summary: 'Tomatoes are high-value crops requiring well-drained loamy soil, warm climate, balanced NPK nutrition, and structured stage-wise irrigation management.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    waterRequirement: {
      totalWater: '600 - 800 mm (approx. 6.0 to 8.0 Lakh Liters per acre over full cycle)',
      perPlantWater: '2 - 4 Liters per plant per day during peak fruiting',
      frequencySummer: 'Every 2 - 3 days (or daily drip fertigation for 45-60 mins)',
      frequencyWinter: 'Every 7 - 8 days',
      method: 'Drip Irrigation with online emitters (2-4 LPH) is highly recommended. Avoid overhead sprinklers to prevent leaf moisture and early blight.',
      criticalStages: 'Flowering onset & fruit expansion. Moisture stress at flowering causes blossom drop and Blossom End Rot.'
    },
    fieldPrep: {
      soilPrep: 'Deep plowing (20-25 cm) followed by 2-3 harrowings. Incorporate 10-12 tons of well-decomposed Farmyard Manure (FYM) or Vermicompost per acre 15 days before transplanting.',
      soilSolarization: 'Solarize soil in hot summer using 25-micron transparent polyethylene sheets for 30 days to kill soil-borne pathogens and nematodes.'
    },
    sowing: {
      depth: '0.5 - 1.0 cm in seedbed / portray',
      germinationDays: '6 - 8 days',
      spacing: '60 cm between rows x 45 cm between plants',
      season: 'Warm Season / Spring & Autumn-Winter',
      seedRate: '100 - 120 grams per acre for hybrids',
      nurseryCare: 'Transplant 25-30 day old seedlings at 4-5 leaf stage. Treat seedling roots with Trichoderma viride (10g/L) for 15 minutes before planting.'
    },
    soil: {
      type: 'Deep, well-drained sandy loam rich in organic matter',
      ph: '6.0 - 6.8 (Slightly acidic to neutral)',
      npkRatio: 'Basal: 50kg DAP + 25kg MOP per acre. Top-dress: 30kg Urea at 30 days & 25kg Urea + 20kg MOP at flowering/fruiting stage.',
      moisture: 'Maintain steady 60-70% field capacity. Avoid waterlogging.'
    },
    care: {
      sunlight: '6 - 8 hours of direct full sun daily',
      waterFreq: 'Every 2-3 days in summer; 7-8 days in winter. Maintain uniform moisture to prevent fruit cracking.',
      pruning: 'Stake plants with bamboo sticks at 20-25 days. Remove side suckers up to 30 cm from ground.'
    },
    diseases: [
      {
        name: 'Early Blight (Alternaria solani)',
        symptoms: 'Concentric target-board brown spots on lower leaves with yellow halo.',
        organicRemedy: 'Foliar spray of Neem Oil 1500 ppm (5ml/L) or Trichoderma viride (5g/L). Prune infected lower leaves.',
        chemicalTreatment: 'Mancozeb 75% WP @ 2g/L or Chlorothalonil 75% WP @ 2g/L.'
      },
      {
        name: 'Blossom End Rot (Physiological)',
        symptoms: 'Dark leather-like sunken rot at the base of fruits caused by Calcium deficiency & uneven watering.',
        organicRemedy: 'Foliar spray of Calcium Chloride (0.5%) + maintain uniform soil moisture.',
        chemicalTreatment: 'Apply Calcium Nitrate @ 5kg/acre through fertigation.'
      }
    ],
    yield: {
      perAcre: '20 - 30 Tons for hybrid varieties',
      harvestDays: '70 - 85 days after transplanting',
      shelfLife: '10 - 14 days at 12-15°C with 85-90% relative humidity'
    }
  },
  {
    id: 'crop-wheat',
    name: 'Wheat (Triticum aestivum)',
    commonName: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Crops & Grains',
    type: 'Staple Cereal Grain',
    summary: 'Wheat is the premier rabi cereal crop. Maximizing yield requires timely sowing and 5-6 stage-specific irrigations delivering 450-650 mm total water.',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    waterRequirement: {
      totalWater: '450 - 650 mm (approx. 4.5 to 6.5 Lakh Liters per acre over 120-135 days)',
      perPlantWater: '50 - 65 mm water depth per irrigation flooding',
      frequencySummer: 'Irrigate every 18 - 22 days depending on soil clay content',
      frequencyWinter: '5 to 6 key stage irrigations throughout crop cycle',
      method: 'Check Basin / Furrow Irrigation or Sprinkler System (Sprinklers save 30% water and boost tillering).',
      criticalStages: '1st: Crown Root Initiation (CRI @ 21 days - MOST CRITICAL), 2nd: Tillering (40d), 3rd: Jointing (60d), 4th: Flowering (80d), 5th: Milking (100d), 6th: Dough stage (115d).'
    },
    fieldPrep: {
      soilPrep: 'Disk plow followed by 2 cultivations and planking to create a fine, weed-free seedbed.',
      soilSolarization: 'Incorporate 8-10 tons of well-decomposed FYM per acre during first plowing.'
    },
    sowing: {
      depth: '4.0 - 5.0 cm into moist soil zone',
      germinationDays: '5 - 7 days',
      spacing: '20 - 22.5 cm row spacing using Seed-cum-Fertilizer Drill',
      season: 'Rabi Season (Optimal sowing window: Nov 1 to Nov 25)',
      seedRate: '40 - 45 kg/acre for normal sowing; 50-55 kg/acre for late sowing',
      nurseryCare: 'Seed Priming: Soak seeds in clean water for 6 hours before sowing. Treat seeds with Carboxin 37.5% + Thiram 37.5% WS @ 3g/kg seed.'
    },
    soil: {
      type: 'Clay loam to well-drained fertile loam',
      ph: '6.0 - 7.5',
      npkRatio: 'Basal: 50kg DAP + 25kg MOP + 10kg Zinc Sulfate (21%). Top-dress: 45kg Urea at CRI (21 DAT) & 45kg Urea at Jointing (45 DAT).',
      moisture: 'Never miss irrigation at CRI stage (21 days); missing CRI irrigation reduces yield by 25-30%.'
    },
    care: {
      sunlight: 'Full direct sunlight throughout crop growth',
      waterFreq: '5-6 irrigations at 21, 40, 60, 80, 100, and 115 days after sowing.'
    },
    diseases: [
      {
        name: 'Yellow / Stripe Rust (Puccinia striiformis)',
        symptoms: 'Bright yellow linear pustules arranged in rows on leaf blades resembling stripes.',
        organicRemedy: 'Use rust-resistant certified seeds (HD 2967, DBW 187). Spray bio-agent Trichoderma (10g/L).',
        chemicalTreatment: 'Propiconazole 25% EC @ 1ml/L at first appearance.'
      }
    ],
    yield: {
      perAcre: '2.0 - 2.8 Tons (20-28 Quintals/acre)',
      harvestDays: '120 - 135 days (when grain moisture drops <12%)',
      shelfLife: '12 - 24 months in clean, airtight metallic storage bins'
    }
  },
  {
    id: 'crop-rice',
    name: 'Paddy Rice (Oryza sativa)',
    commonName: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'Crops & Grains',
    type: 'Staple Cereal',
    summary: 'Paddy rice has high water demand requiring 1200-1500 mm total water. Continuous shallow submergence (2-5 cm) is needed during vegetative tillering.',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    waterRequirement: {
      totalWater: '1200 - 1500 mm (approx. 12 to 15 Lakh Liters per acre over 120 days)',
      perPlantWater: 'Standing water depth of 2 to 5 cm',
      frequencySummer: 'Continuous submergence or alternate wetting & drying (AWD) every 3-5 days',
      frequencyWinter: 'Daily water level check in flooded paddies',
      method: 'Controlled Paddy Basin Flooding or Alternate Wetting & Drying (AWD) using field water tubes to save 25% water.',
      criticalStages: 'Panicle Initiation & Flowering. Water stress at panicle initiation causes high spikelet sterility (chaffy grain).'
    },
    fieldPrep: {
      soilPrep: 'Puddling: Plow field 3-4 times in 5-7 cm standing water to break soil aggregates and reduce water percolation.',
      soilSolarization: 'Incorporate Green Manure crop (Dhaincha / Sunn hemp) 15 days prior to puddling.'
    },
    sowing: {
      depth: '2 - 3 cm in wet nursery bed',
      germinationDays: '3 - 5 days',
      spacing: '20 x 15 cm (Transplanting 2-3 seedlings per hill)',
      season: 'Kharif Season (June - November)',
      seedRate: '10 - 12 kg/acre for transplanted rice; 20-25 kg for Direct Seeded Rice (DSR)',
      nurseryCare: 'Salt Water Seed Treatment: Soak seed in 10% salt water to float out unviable seed. Rinse & treat with Pseudomonas fluorescens @ 10g/kg.'
    },
    soil: {
      type: 'Heavy clay or clay loam with high water holding capacity',
      ph: '5.5 - 6.5',
      npkRatio: 'Basal: 40kg DAP + 20kg MOP + 10kg Zinc Sulfate. Top-dress Urea: 30kg at 15 DAT, 30kg at 35 DAT, 25kg at 55 DAT.',
      moisture: 'Maintain 2-5 cm standing water until 10 days prior to harvest.'
    },
    care: {
      sunlight: 'Bright full sunshine',
      waterFreq: 'Continuous flooding during vegetative growth. Drain 10 days before harvesting.'
    },
    diseases: [
      {
        name: 'Rice Blast (Magnaporthe oryzae)',
        symptoms: 'Spindle-shaped or diamond lesions with reddish-brown margins and gray-white centers.',
        organicRemedy: 'Seed treatment with Pseudomonas fluorescens @ 10g/kg; spray Neem Oil 5ml/L.',
        chemicalTreatment: 'Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.'
      }
    ],
    yield: {
      perAcre: '2.4 - 3.5 Tons paddy grain',
      harvestDays: '115 - 140 days',
      shelfLife: '1 - 3 years when sun-dried to under 13% grain moisture'
    }
  },
  {
    id: 'crop-neem',
    name: 'Neem Tree (Azadirachta indica)',
    commonName: 'Neem',
    scientificName: 'Azadirachta indica',
    category: 'Medicinal',
    type: 'Medicinal / Organic Biopesticide Source',
    summary: 'Neem is extremely drought-hardy. It requires minimal irrigation (300-400 mm/year) during initial establishment.',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    waterRequirement: {
      totalWater: '300 - 400 mm per year (mainly during initial 1-2 sapling years)',
      perPlantWater: '10 - 15 Liters per sapling during dry summer weeks',
      frequencySummer: 'Every 7 - 10 days for 1st year saplings; zero irrigation required after year 3',
      frequencyWinter: 'Every 15 - 20 days in 1st year',
      method: 'Basin Irrigation for young saplings; rainfed once deep taproot reaches groundwater.',
      criticalStages: 'First summer post-transplanting. Protect young saplings from extreme heat desiccation.'
    },
    fieldPrep: {
      soilPrep: 'Dig 45 x 45 x 45 cm pits at 5x5m spacing. Fill pit with topsoil mixed with 10kg compost + 250g Neem Cake.',
      soilSolarization: 'Expose pit soil to sun for 15 days before planting saplings.'
    },
    sowing: {
      depth: '1 - 2 cm',
      germinationDays: '14 - 21 days',
      spacing: '5 x 5 meters for orchard',
      season: 'Monsoon Rain',
      seedRate: 'Sow fresh seeds immediately after harvest',
      nurseryCare: 'Plant 6-9 month old nursery saplings during monsoon rain.'
    },
    soil: {
      type: 'Tolerates infertile, stony, sandy, or alkaline soil',
      ph: '5.0 - 8.5',
      npkRatio: 'Apply 15-20 kg organic compost + 2kg Neem cake per tree annually.',
      moisture: 'Highly drought resistant once taproot reaches deep groundwater.'
    },
    care: {
      sunlight: 'Unrestricted full sunshine',
      waterFreq: 'Irrigate only during first 1-2 years during dry months.'
    },
    diseases: [
      {
        name: 'Tip Rot & Leaf Spot',
        symptoms: 'Browning of leaf tips under excessive humidity.',
        organicRemedy: 'Improve soil drainage around root zone.',
        chemicalTreatment: 'Foliar spray of Copper Oxychloride @ 2.5g/L.'
      }
    ],
    yield: {
      perAcre: '30 - 50 kg seed berries per mature tree annually',
      harvestDays: 'Trees fruit from 3-5 years onward',
      shelfLife: 'Neem Cake: 1-2 years in dry shade'
    }
  }
];
