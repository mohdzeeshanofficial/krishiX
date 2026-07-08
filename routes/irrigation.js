const express = require('express');
const router = express.Router();

// Get irrigation schedule for a crop
router.post('/schedule', async (req, res) => {
  try {
    const { cropId, soilType, weatherData, soilMoisture, farmSize } = req.body;

    // Calculate irrigation requirements based on crop, soil, and weather
    const irrigationSchedule = calculateIrrigationSchedule(cropId, soilType, weatherData, soilMoisture, farmSize);

    res.json({
      cropId,
      schedule: irrigationSchedule,
      recommendations: generateIrrigationRecommendations(irrigationSchedule),
      waterConservation: getWaterConservationTips()
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate irrigation schedule', error: error.message });
  }
});

// Get irrigation recommendations based on weather
router.post('/weather-based', async (req, res) => {
  try {
    const { weatherData, soilMoisture, cropType } = req.body;

    const recommendations = {
      immediate: getImmediateRecommendations(weatherData, soilMoisture),
      shortTerm: getShortTermRecommendations(weatherData, soilMoisture),
      longTerm: getLongTermRecommendations(weatherData, soilMoisture),
      alerts: getIrrigationAlerts(weatherData, soilMoisture)
    };

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get weather-based recommendations', error: error.message });
  }
});

// Calculate water requirements
router.post('/water-requirements', async (req, res) => {
  try {
    const { cropType, growthStage, weatherData, soilType } = req.body;

    const waterRequirements = {
      daily: calculateDailyWaterRequirement(cropType, growthStage, weatherData),
      weekly: calculateWeeklyWaterRequirement(cropType, growthStage, weatherData),
      monthly: calculateMonthlyWaterRequirement(cropType, growthStage, weatherData),
      efficiency: calculateIrrigationEfficiency(soilType),
      savings: calculateWaterSavings(cropType, weatherData)
    };

    res.json(waterRequirements);
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate water requirements', error: error.message });
  }
});

// Helper functions
function calculateIrrigationSchedule(cropId, soilType, weatherData, soilMoisture, farmSize) {
  const baseSchedule = {
    frequency: getIrrigationFrequency(cropId, soilType, weatherData),
    duration: getIrrigationDuration(cropId, soilType, farmSize),
    timing: getOptimalIrrigationTiming(weatherData),
    method: getRecommendedIrrigationMethod(cropId, soilType),
    amount: calculateWaterAmount(cropId, soilType, farmSize, weatherData)
  };

  // Adjust based on current soil moisture
  if (soilMoisture < 30) {
    baseSchedule.frequency = 'Daily';
    baseSchedule.amount *= 1.2;
  } else if (soilMoisture > 70) {
    baseSchedule.frequency = 'Every 3-4 days';
    baseSchedule.amount *= 0.8;
  }

  return {
    ...baseSchedule,
    schedule: generateWeeklySchedule(baseSchedule, weatherData),
    adjustments: getWeatherAdjustments(weatherData)
  };
}

function getIrrigationFrequency(cropId, soilType, weatherData) {
  const baseFrequencies = {
    'rice': 'Daily',
    'wheat': 'Every 2-3 days',
    'tomato': 'Every 2 days',
    'corn': 'Every 3 days',
    'potato': 'Every 2-3 days'
  };

  let frequency = baseFrequencies[cropId] || 'Every 3 days';

  // Adjust based on weather
  if (weatherData.temperature > 35) {
    frequency = 'Daily';
  } else if (weatherData.rainfall > 20) {
    frequency = 'Every 4-5 days';
  }

  // Adjust based on soil type
  if (soilType === 'sandy') {
    frequency = 'Daily';
  } else if (soilType === 'clay') {
    frequency = 'Every 4-5 days';
  }

  return frequency;
}

function getIrrigationDuration(cropId, soilType, farmSize) {
  const baseDuration = {
    'rice': 30,
    'wheat': 20,
    'tomato': 25,
    'corn': 30,
    'potato': 20
  };

  let duration = baseDuration[cropId] || 25; // minutes per session

  // Adjust based on farm size
  duration *= Math.ceil(farmSize / 10);

  // Adjust based on soil type
  if (soilType === 'sandy') {
    duration *= 1.5;
  } else if (soilType === 'clay') {
    duration *= 0.7;
  }

  return Math.round(duration);
}

function getOptimalIrrigationTiming(weatherData) {
  if (weatherData.temperature > 30) {
    return 'Early morning (5-7 AM) or Evening (6-8 PM)';
  } else if (weatherData.windSpeed > 15) {
    return 'Early morning (5-7 AM)';
  } else {
    return 'Early morning (5-7 AM) or Late afternoon (4-6 PM)';
  }
}

function getRecommendedIrrigationMethod(cropId, soilType) {
  const methods = {
    'rice': 'Flood irrigation',
    'wheat': 'Sprinkler irrigation',
    'tomato': 'Drip irrigation',
    'corn': 'Sprinkler irrigation',
    'potato': 'Drip irrigation'
  };

  return methods[cropId] || 'Sprinkler irrigation';
}

function calculateWaterAmount(cropId, soilType, farmSize, weatherData) {
  const baseAmounts = {
    'rice': 25,
    'wheat': 15,
    'tomato': 20,
    'corn': 18,
    'potato': 16
  };

  let amount = baseAmounts[cropId] || 20; // liters per square meter

  // Adjust based on weather
  if (weatherData.temperature > 35) {
    amount *= 1.3;
  } else if (weatherData.rainfall > 10) {
    amount *= 0.7;
  }

  // Adjust based on soil type
  if (soilType === 'sandy') {
    amount *= 1.2;
  } else if (soilType === 'clay') {
    amount *= 0.8;
  }

  return Math.round(amount * farmSize);
}

function generateWeeklySchedule(baseSchedule, weatherData) {
  const schedule = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  days.forEach((day, index) => {
    const dayWeather = weatherData.forecast?.[index] || weatherData;
    
    schedule.push({
      day,
      irrigation: shouldIrrigate(dayWeather, baseSchedule.frequency),
      time: baseSchedule.timing,
      duration: baseSchedule.duration,
      amount: baseSchedule.amount,
      notes: getIrrigationNotes(dayWeather)
    });
  });

  return schedule;
}

function shouldIrrigate(weatherData, frequency) {
  if (weatherData.rainfall > 15) {
    return false;
  }
  
  if (frequency === 'Daily') {
    return true;
  } else if (frequency === 'Every 2 days') {
    return Math.random() > 0.5; // Simplified logic
  } else if (frequency === 'Every 3 days') {
    return Math.random() > 0.7;
  }
  
  return true;
}

function getIrrigationNotes(weatherData) {
  const notes = [];
  
  if (weatherData.rainfall > 10) {
    notes.push('Reduce irrigation due to rainfall');
  }
  
  if (weatherData.temperature > 35) {
    notes.push('Increase irrigation due to high temperature');
  }
  
  if (weatherData.windSpeed > 20) {
    notes.push('Avoid irrigation during high winds');
  }
  
  return notes;
}

function generateIrrigationRecommendations(schedule) {
  return [
    {
      type: 'timing',
      title: 'Optimal Irrigation Timing',
      description: 'Water your crops during early morning hours to minimize evaporation and maximize absorption.',
      priority: 'high'
    },
    {
      type: 'method',
      title: 'Irrigation Method',
      description: 'Use drip irrigation for water efficiency and better crop health.',
      priority: 'medium'
    },
    {
      type: 'monitoring',
      title: 'Soil Moisture Monitoring',
      description: 'Regularly check soil moisture levels to avoid over or under watering.',
      priority: 'high'
    },
    {
      type: 'conservation',
      title: 'Water Conservation',
      description: 'Implement mulching and cover crops to retain soil moisture.',
      priority: 'medium'
    }
  ];
}

function getWaterConservationTips() {
  return [
    'Use mulch to reduce evaporation',
    'Implement drip irrigation systems',
    'Collect and store rainwater',
    'Use drought-resistant crop varieties',
    'Practice crop rotation',
    'Monitor soil moisture regularly',
    'Avoid over-irrigation',
    'Use organic matter to improve soil water retention'
  ];
}

function getImmediateRecommendations(weatherData, soilMoisture) {
  const recommendations = [];
  
  if (soilMoisture < 30) {
    recommendations.push({
      action: 'Immediate irrigation required',
      description: 'Soil moisture is critically low. Irrigate immediately.',
      urgency: 'high'
    });
  }
  
  if (weatherData.temperature > 35) {
    recommendations.push({
      action: 'Increase irrigation frequency',
      description: 'High temperature detected. Increase watering frequency.',
      urgency: 'medium'
    });
  }
  
  if (weatherData.rainfall > 20) {
    recommendations.push({
      action: 'Reduce irrigation',
      description: 'Heavy rainfall expected. Reduce or skip irrigation.',
      urgency: 'medium'
    });
  }
  
  return recommendations;
}

function getShortTermRecommendations(weatherData, soilMoisture) {
  return [
    {
      period: 'Next 3 days',
      action: 'Monitor soil moisture',
      description: 'Check soil moisture levels daily and adjust irrigation accordingly.'
    },
    {
      period: 'Next week',
      action: 'Weather-based irrigation',
      description: 'Adjust irrigation schedule based on weather forecast.'
    }
  ];
}

function getLongTermRecommendations(weatherData, soilMoisture) {
  return [
    {
      period: 'Next month',
      action: 'Install moisture sensors',
      description: 'Consider installing automated soil moisture sensors for better irrigation management.'
    },
    {
      period: 'Season planning',
      action: 'Water-efficient crops',
      description: 'Plan to grow drought-resistant crops in water-scarce periods.'
    }
  ];
}

function getIrrigationAlerts(weatherData, soilMoisture) {
  const alerts = [];
  
  if (soilMoisture < 20) {
    alerts.push({
      type: 'critical',
      message: 'Critical soil moisture level. Immediate irrigation required.',
      action: 'Irrigate immediately'
    });
  }
  
  if (weatherData.temperature > 40) {
    alerts.push({
      type: 'warning',
      message: 'Extreme temperature detected. Increase irrigation frequency.',
      action: 'Monitor crops closely'
    });
  }
  
  if (weatherData.rainfall > 30) {
    alerts.push({
      type: 'info',
      message: 'Heavy rainfall expected. Reduce irrigation schedule.',
      action: 'Adjust irrigation plan'
    });
  }
  
  return alerts;
}

function calculateDailyWaterRequirement(cropType, growthStage, weatherData) {
  const baseRequirements = {
    'rice': 8,
    'wheat': 5,
    'tomato': 6,
    'corn': 7,
    'potato': 5
  };
  
  let requirement = baseRequirements[cropType] || 6; // liters per square meter per day
  
  // Adjust based on growth stage
  const growthMultipliers = {
    'seedling': 0.5,
    'vegetative': 1.0,
    'flowering': 1.2,
    'fruiting': 1.1,
    'maturity': 0.8
  };
  
  requirement *= growthMultipliers[growthStage] || 1.0;
  
  // Adjust based on weather
  if (weatherData.temperature > 30) {
    requirement *= 1.2;
  }
  
  if (weatherData.humidity < 40) {
    requirement *= 1.1;
  }
  
  return Math.round(requirement);
}

function calculateWeeklyWaterRequirement(cropType, growthStage, weatherData) {
  return calculateDailyWaterRequirement(cropType, growthStage, weatherData) * 7;
}

function calculateMonthlyWaterRequirement(cropType, growthStage, weatherData) {
  return calculateDailyWaterRequirement(cropType, growthStage, weatherData) * 30;
}

function calculateIrrigationEfficiency(soilType) {
  const efficiencies = {
    'clay': 0.8,
    'loamy': 0.9,
    'sandy': 0.7,
    'silty': 0.85,
    'peaty': 0.75,
    'chalky': 0.8
  };
  
  return efficiencies[soilType] || 0.8;
}

function calculateWaterSavings(cropType, weatherData) {
  let savings = 0;
  
  if (weatherData.rainfall > 10) {
    savings += 20; // 20% savings from rainfall
  }
  
  if (weatherData.humidity > 70) {
    savings += 10; // 10% savings from high humidity
  }
  
  return Math.min(savings, 30); // Cap at 30% savings
}

function getWeatherAdjustments(weatherData) {
  const adjustments = [];
  
  if (weatherData.temperature > 35) {
    adjustments.push({
      factor: 'temperature',
      adjustment: 'Increase irrigation by 20%',
      reason: 'High temperature increases water demand'
    });
  }
  
  if (weatherData.rainfall > 15) {
    adjustments.push({
      factor: 'rainfall',
      adjustment: 'Reduce irrigation by 30%',
      reason: 'Rainfall provides natural irrigation'
    });
  }
  
  if (weatherData.windSpeed > 20) {
    adjustments.push({
      factor: 'wind',
      adjustment: 'Avoid irrigation during high winds',
      reason: 'Wind causes uneven water distribution'
    });
  }
  
  return adjustments;
}

module.exports = router;








