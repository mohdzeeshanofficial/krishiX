// Sample crop data for KrishiX
const sampleCrops = [
  {
    name: "Rice",
    scientificName: "Oryza sativa",
    category: "cereal",
    season: "kharif",
    duration: 120,
    soilTypes: ["clay", "loamy", "silty"],
    temperature: {
      min: 20,
      max: 35,
      optimal: 28
    },
    rainfall: {
      min: 1000,
      max: 2000,
      optimal: 1500
    },
    ph: {
      min: 6.0,
      max: 7.5,
      optimal: 6.8
    },
    waterRequirement: "high",
    nutrients: {
      nitrogen: 120,
      phosphorus: 60,
      potassium: 80
    },
    plantingTime: {
      start: "June",
      end: "August"
    },
    harvestingTime: {
      start: "October",
      end: "December"
    },
    yield: {
      min: 3000,
      max: 6000,
      unit: "kg/hectare"
    },
    marketPrice: {
      min: 25,
      max: 35,
      unit: "INR/kg"
    },
    diseases: [
      {
        name: "Blast",
        symptoms: "Spots on leaves and panicles",
        treatment: "Fungicide application",
        prevention: "Use resistant varieties"
      }
    ],
    pests: [
      {
        name: "Brown Planthopper",
        damage: "Sucks sap from plants",
        control: "Insecticide application",
        prevention: "Remove weeds and use resistant varieties"
      }
    ],
    cultivationTips: [
      "Maintain proper water level in fields",
      "Use certified seeds",
      "Apply balanced fertilizers",
      "Control weeds regularly"
    ],
    description: "Rice is a staple food crop that requires flooded conditions for optimal growth."
  },
  {
    name: "Wheat",
    scientificName: "Triticum aestivum",
    category: "cereal",
    season: "rabi",
    duration: 150,
    soilTypes: ["loamy", "clay", "silty"],
    temperature: {
      min: 15,
      max: 25,
      optimal: 20
    },
    rainfall: {
      min: 400,
      max: 800,
      optimal: 600
    },
    ph: {
      min: 6.0,
      max: 7.5,
      optimal: 6.5
    },
    waterRequirement: "medium",
    nutrients: {
      nitrogen: 100,
      phosphorus: 50,
      potassium: 60
    },
    plantingTime: {
      start: "October",
      end: "December"
    },
    harvestingTime: {
      start: "March",
      end: "May"
    },
    yield: {
      min: 2500,
      max: 4500,
      unit: "kg/hectare"
    },
    marketPrice: {
      min: 20,
      max: 30,
      unit: "INR/kg"
    },
    diseases: [
      {
        name: "Rust",
        symptoms: "Orange or black pustules on leaves",
        treatment: "Fungicide application",
        prevention: "Use resistant varieties and crop rotation"
      }
    ],
    pests: [
      {
        name: "Aphids",
        damage: "Sucks sap and transmits viruses",
        control: "Insecticide application",
        prevention: "Use resistant varieties and natural predators"
      }
    ],
    cultivationTips: [
      "Prepare seedbed properly",
      "Use recommended seed rate",
      "Apply fertilizers at right time",
      "Control weeds and pests"
    ],
    description: "Wheat is a major cereal crop grown in winter season with good market demand."
  },
  {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    category: "vegetable",
    season: "all",
    duration: 90,
    soilTypes: ["loamy", "sandy", "clay"],
    temperature: {
      min: 18,
      max: 30,
      optimal: 24
    },
    rainfall: {
      min: 400,
      max: 800,
      optimal: 600
    },
    ph: {
      min: 6.0,
      max: 7.0,
      optimal: 6.5
    },
    waterRequirement: "medium",
    nutrients: {
      nitrogen: 80,
      phosphorus: 40,
      potassium: 100
    },
    plantingTime: {
      start: "January",
      end: "March"
    },
    harvestingTime: {
      start: "April",
      end: "June"
    },
    yield: {
      min: 20000,
      max: 40000,
      unit: "kg/hectare"
    },
    marketPrice: {
      min: 15,
      max: 40,
      unit: "INR/kg"
    },
    diseases: [
      {
        name: "Early Blight",
        symptoms: "Dark spots on leaves and fruits",
        treatment: "Fungicide application",
        prevention: "Crop rotation and proper spacing"
      }
    ],
    pests: [
      {
        name: "Whitefly",
        damage: "Sucks sap and transmits viruses",
        control: "Insecticide application",
        prevention: "Use yellow sticky traps and resistant varieties"
      }
    ],
    cultivationTips: [
      "Use disease-free seeds",
      "Provide proper support for plants",
      "Control irrigation to prevent diseases",
      "Harvest at proper maturity"
    ],
    description: "Tomato is a popular vegetable crop with high nutritional value and market demand."
  },
  {
    name: "Maize",
    scientificName: "Zea mays",
    category: "cereal",
    season: "kharif",
    duration: 100,
    soilTypes: ["loamy", "sandy", "clay"],
    temperature: {
      min: 20,
      max: 30,
      optimal: 25
    },
    rainfall: {
      min: 500,
      max: 1000,
      optimal: 750
    },
    ph: {
      min: 6.0,
      max: 7.5,
      optimal: 6.8
    },
    waterRequirement: "medium",
    nutrients: {
      nitrogen: 120,
      phosphorus: 60,
      potassium: 80
    },
    plantingTime: {
      start: "June",
      end: "July"
    },
    harvestingTime: {
      start: "September",
      end: "October"
    },
    yield: {
      min: 3000,
      max: 6000,
      unit: "kg/hectare"
    },
    marketPrice: {
      min: 18,
      max: 25,
      unit: "INR/kg"
    },
    diseases: [
      {
        name: "Downy Mildew",
        symptoms: "Yellow spots on leaves",
        treatment: "Fungicide application",
        prevention: "Use resistant varieties and proper spacing"
      }
    ],
    pests: [
      {
        name: "Corn Borer",
        damage: "Bores into stems and ears",
        control: "Insecticide application",
        prevention: "Use Bt varieties and crop rotation"
      }
    ],
    cultivationTips: [
      "Use hybrid seeds for better yield",
      "Maintain proper plant spacing",
      "Apply fertilizers in split doses",
      "Control weeds and pests timely"
    ],
    description: "Maize is a versatile crop used for food, feed, and industrial purposes."
  },
  {
    name: "Potato",
    scientificName: "Solanum tuberosum",
    category: "vegetable",
    season: "rabi",
    duration: 120,
    soilTypes: ["loamy", "sandy", "clay"],
    temperature: {
      min: 15,
      max: 25,
      optimal: 20
    },
    rainfall: {
      min: 300,
      max: 600,
      optimal: 450
    },
    ph: {
      min: 5.5,
      max: 6.5,
      optimal: 6.0
    },
    waterRequirement: "medium",
    nutrients: {
      nitrogen: 100,
      phosphorus: 80,
      potassium: 120
    },
    plantingTime: {
      start: "October",
      end: "December"
    },
    harvestingTime: {
      start: "February",
      end: "April"
    },
    yield: {
      min: 15000,
      max: 30000,
      unit: "kg/hectare"
    },
    marketPrice: {
      min: 12,
      max: 25,
      unit: "INR/kg"
    },
    diseases: [
      {
        name: "Late Blight",
        symptoms: "Dark spots on leaves and tubers",
        treatment: "Fungicide application",
        prevention: "Use disease-free seed tubers and crop rotation"
      }
    ],
    pests: [
      {
        name: "Colorado Potato Beetle",
        damage: "Defoliates plants",
        control: "Insecticide application",
        prevention: "Crop rotation and resistant varieties"
      }
    ],
    cultivationTips: [
      "Use certified seed tubers",
      "Plant at proper depth and spacing",
      "Control irrigation to prevent diseases",
      "Harvest at proper maturity"
    ],
    description: "Potato is a major food crop with high nutritional value and good market demand."
  },
  {
    name: "Sugarcane",
    scientificName: "Saccharum officinarum",
    category: "cereal",
    season: "all",
    duration: 365,
    soilTypes: ["clay", "loamy", "silty"],
    temperature: {
      min: 20,
      max: 35,
      optimal: 28
    },
    rainfall: {
      min: 1000,
      max: 2000,
      optimal: 1500
    },
    ph: {
      min: 6.0,
      max: 7.5,
      optimal: 6.8
    },
    waterRequirement: "high",
    nutrients: {
      nitrogen: 200,
      phosphorus: 100,
      potassium: 150
    },
    plantingTime: {
      start: "February",
      end: "April"
    },
    harvestingTime: {
      start: "December",
      end: "March"
    },
    yield: {
      min: 60000,
      max: 100000,
      unit: "kg/hectare"
    },
    marketPrice: {
      min: 3,
      max: 4,
      unit: "INR/kg"
    },
    diseases: [
      {
        name: "Red Rot",
        symptoms: "Red discoloration of stalks",
        treatment: "Fungicide application",
        prevention: "Use disease-free setts and crop rotation"
      }
    ],
    pests: [
      {
        name: "Sugarcane Borer",
        damage: "Bores into stalks",
        control: "Insecticide application",
        prevention: "Use resistant varieties and biological control"
      }
    ],
    cultivationTips: [
      "Use healthy setts for planting",
      "Maintain proper spacing",
      "Apply fertilizers in split doses",
      "Control weeds and pests regularly"
    ],
    description: "Sugarcane is a major cash crop used for sugar production and ethanol."
  }
];

module.exports = sampleCrops;








