const express = require('express');
const router = express.Router();

// Analyze soil conditions
router.post('/analyze', async (req, res) => {
  try {
    const { ph, moisture, nitrogen, phosphorus, potassium, organicMatter, soilType } = req.body;

    const analysis = {
      ph: {
        value: ph,
        status: getPhStatus(ph),
        recommendation: getPhRecommendation(ph)
      },
      moisture: {
        value: moisture,
        status: getMoistureStatus(moisture),
        recommendation: getMoistureRecommendation(moisture)
      },
      nutrients: {
        nitrogen: {
          value: nitrogen,
          status: getNutrientStatus(nitrogen, 'nitrogen'),
          recommendation: getNutrientRecommendation(nitrogen, 'nitrogen')
        },
        phosphorus: {
          value: phosphorus,
          status: getNutrientStatus(phosphorus, 'phosphorus'),
          recommendation: getNutrientRecommendation(phosphorus, 'phosphorus')
        },
        potassium: {
          value: potassium,
          status: getNutrientStatus(potassium, 'potassium'),
          recommendation: getNutrientRecommendation(potassium, 'potassium')
        }
      },
      organicMatter: {
        value: organicMatter,
        status: getOrganicMatterStatus(organicMatter),
        recommendation: getOrganicMatterRecommendation(organicMatter)
      },
      overallHealth: calculateOverallHealth(ph, moisture, nitrogen, phosphorus, potassium, organicMatter),
      recommendations: generateSoilRecommendations(ph, moisture, nitrogen, phosphorus, potassium, organicMatter, soilType)
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze soil', error: error.message });
  }
});

// Get soil improvement recommendations
router.post('/improve', async (req, res) => {
  try {
    const { soilType, currentPh, targetPh, currentNutrients, targetCrop } = req.body;

    const improvements = [];

    // pH adjustment
    if (currentPh < targetPh) {
      improvements.push({
        type: 'ph_adjustment',
        action: 'Add lime to increase pH',
        amount: calculateLimeAmount(currentPh, targetPh, soilType),
        timing: 'Apply 2-3 weeks before planting',
        cost: calculateLimeCost(currentPh, targetPh, soilType)
      });
    } else if (currentPh > targetPh) {
      improvements.push({
        type: 'ph_adjustment',
        action: 'Add sulfur to decrease pH',
        amount: calculateSulfurAmount(currentPh, targetPh, soilType),
        timing: 'Apply 2-3 weeks before planting',
        cost: calculateSulfurCost(currentPh, targetPh, soilType)
      });
    }

    // Nutrient recommendations
    const nutrientDeficiencies = analyzeNutrientDeficiencies(currentNutrients, targetCrop);
    nutrientDeficiencies.forEach(deficiency => {
      improvements.push({
        type: 'nutrient_addition',
        nutrient: deficiency.nutrient,
        action: `Add ${deficiency.fertilizer}`,
        amount: deficiency.amount,
        timing: deficiency.timing,
        cost: deficiency.cost
      });
    });

    // Organic matter improvement
    if (currentNutrients.organicMatter < 3) {
      improvements.push({
        type: 'organic_matter',
        action: 'Add compost or organic matter',
        amount: '5-10 tons per hectare',
        timing: 'Apply before planting season',
        cost: 5000
      });
    }

    res.json({
      improvements,
      totalCost: improvements.reduce((sum, imp) => sum + (imp.cost || 0), 0),
      timeline: generateImprovementTimeline(improvements)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate soil improvements', error: error.message });
  }
});

// Helper functions
function getPhStatus(ph) {
  if (ph < 6.0) return 'acidic';
  if (ph > 8.0) return 'alkaline';
  return 'neutral';
}

function getPhRecommendation(ph) {
  if (ph < 6.0) return 'Add lime to increase pH';
  if (ph > 8.0) return 'Add sulfur to decrease pH';
  return 'pH is optimal for most crops';
}

function getMoistureStatus(moisture) {
  if (moisture < 30) return 'dry';
  if (moisture > 80) return 'wet';
  return 'optimal';
}

function getMoistureRecommendation(moisture) {
  if (moisture < 30) return 'Increase irrigation frequency';
  if (moisture > 80) return 'Improve drainage to prevent waterlogging';
  return 'Moisture level is optimal';
}

function getNutrientStatus(value, nutrient) {
  const thresholds = {
    nitrogen: { low: 20, high: 60 },
    phosphorus: { low: 10, high: 30 },
    potassium: { low: 50, high: 150 }
  };

  if (value < thresholds[nutrient].low) return 'deficient';
  if (value > thresholds[nutrient].high) return 'excessive';
  return 'adequate';
}

function getNutrientRecommendation(value, nutrient) {
  const status = getNutrientStatus(value, nutrient);
  if (status === 'deficient') return `Add ${nutrient} fertilizer`;
  if (status === 'excessive') return `Reduce ${nutrient} application`;
  return `${nutrient} level is adequate`;
}

function getOrganicMatterStatus(organicMatter) {
  if (organicMatter < 2) return 'low';
  if (organicMatter > 5) return 'high';
  return 'adequate';
}

function getOrganicMatterRecommendation(organicMatter) {
  if (organicMatter < 2) return 'Add compost or organic matter';
  if (organicMatter > 5) return 'Organic matter level is high';
  return 'Organic matter level is adequate';
}

function calculateOverallHealth(ph, moisture, nitrogen, phosphorus, potassium, organicMatter) {
  let score = 0;
  
  if (ph >= 6.0 && ph <= 7.5) score += 20;
  if (moisture >= 40 && moisture <= 70) score += 20;
  if (nitrogen >= 20 && nitrogen <= 60) score += 15;
  if (phosphorus >= 10 && phosphorus <= 30) score += 15;
  if (potassium >= 50 && potassium <= 150) score += 15;
  if (organicMatter >= 2 && organicMatter <= 5) score += 15;

  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

function generateSoilRecommendations(ph, moisture, nitrogen, phosphorus, potassium, organicMatter, soilType) {
  const recommendations = [];

  if (ph < 6.0) {
    recommendations.push({
      priority: 'high',
      action: 'Apply lime to increase soil pH',
      timing: '2-3 weeks before planting',
      cost: 2000
    });
  }

  if (moisture < 30) {
    recommendations.push({
      priority: 'high',
      action: 'Improve irrigation system',
      timing: 'Immediate',
      cost: 5000
    });
  }

  if (nitrogen < 20) {
    recommendations.push({
      priority: 'medium',
      action: 'Apply nitrogen fertilizer',
      timing: 'Before planting',
      cost: 1500
    });
  }

  if (organicMatter < 2) {
    recommendations.push({
      priority: 'medium',
      action: 'Add compost or organic matter',
      timing: 'Before planting season',
      cost: 3000
    });
  }

  return recommendations;
}

function calculateLimeAmount(currentPh, targetPh, soilType) {
  const phDifference = targetPh - currentPh;
  const limeRates = {
    clay: 2000,
    loamy: 1500,
    sandy: 1000
  };
  return phDifference * limeRates[soilType] || 1500;
}

function calculateLimeCost(currentPh, targetPh, soilType) {
  const amount = calculateLimeAmount(currentPh, targetPh, soilType);
  return amount * 0.5; // 0.5 per kg
}

function calculateSulfurAmount(currentPh, targetPh, soilType) {
  const phDifference = currentPh - targetPh;
  const sulfurRates = {
    clay: 500,
    loamy: 400,
    sandy: 300
  };
  return phDifference * sulfurRates[soilType] || 400;
}

function calculateSulfurCost(currentPh, targetPh, soilType) {
  const amount = calculateSulfurAmount(currentPh, targetPh, soilType);
  return amount * 0.8; // 0.8 per kg
}

function analyzeNutrientDeficiencies(currentNutrients, targetCrop) {
  const deficiencies = [];
  
  if (currentNutrients.nitrogen < 20) {
    deficiencies.push({
      nutrient: 'nitrogen',
      fertilizer: 'Urea',
      amount: '50-100 kg per hectare',
      timing: 'Before planting',
      cost: 2000
    });
  }

  if (currentNutrients.phosphorus < 10) {
    deficiencies.push({
      nutrient: 'phosphorus',
      fertilizer: 'DAP',
      amount: '25-50 kg per hectare',
      timing: 'Before planting',
      cost: 1500
    });
  }

  if (currentNutrients.potassium < 50) {
    deficiencies.push({
      nutrient: 'potassium',
      fertilizer: 'MOP',
      amount: '30-60 kg per hectare',
      timing: 'Before planting',
      cost: 1800
    });
  }

  return deficiencies;
}

function generateImprovementTimeline(improvements) {
  const timeline = [];
  const now = new Date();

  improvements.forEach((improvement, index) => {
    timeline.push({
      week: index + 1,
      date: new Date(now.getTime() + index * 7 * 24 * 60 * 60 * 1000),
      action: improvement.action,
      type: improvement.type
    });
  });

  return timeline;
}

module.exports = router;








