const express = require('express');
const Advisory = require('../models/Advisory');
const Crop = require('../models/Crop');
const User = require('../models/User');
const router = express.Router();

// Get all advisories for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, status, priority } = req.query;

    let filter = { user: userId };
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const advisories = await Advisory.find(filter)
      .populate('crop', 'name scientificName category')
      .sort({ createdAt: -1 });

    res.json(advisories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch advisories', error: error.message });
  }
});

// Get advisory by ID
router.get('/:id', async (req, res) => {
  try {
    const advisory = await Advisory.findById(req.params.id)
      .populate('crop', 'name scientificName category')
      .populate('user', 'name email phone');

    if (!advisory) {
      return res.status(404).json({ message: 'Advisory not found' });
    }

    res.json(advisory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch advisory', error: error.message });
  }
});

// Create new advisory
router.post('/', async (req, res) => {
  try {
    const advisory = new Advisory(req.body);
    await advisory.save();
    
    const populatedAdvisory = await Advisory.findById(advisory._id)
      .populate('crop', 'name scientificName category')
      .populate('user', 'name email phone');

    res.status(201).json(populatedAdvisory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create advisory', error: error.message });
  }
});

// Update advisory status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const advisory = await Advisory.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('crop', 'name scientificName category');

    if (!advisory) {
      return res.status(404).json({ message: 'Advisory not found' });
    }

    res.json(advisory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update advisory status', error: error.message });
  }
});

// Mark advisory as read
router.put('/:id/read', async (req, res) => {
  try {
    const advisory = await Advisory.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!advisory) {
      return res.status(404).json({ message: 'Advisory not found' });
    }

    res.json({ message: 'Advisory marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark advisory as read', error: error.message });
  }
});

// Add feedback to advisory
router.post('/:id/feedback', async (req, res) => {
  try {
    const { rating, comment, helpful } = req.body;
    const advisory = await Advisory.findByIdAndUpdate(
      req.params.id,
      { 
        feedback: { rating, comment, helpful },
        isRead: true 
      },
      { new: true }
    );

    if (!advisory) {
      return res.status(404).json({ message: 'Advisory not found' });
    }

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
});

// Generate personalized advisories
router.post('/generate', async (req, res) => {
  try {
    const { userId, cropId, weatherData, soilData } = req.body;

    const user = await User.findById(userId);
    const crop = await Crop.findById(cropId);

    if (!user || !crop) {
      return res.status(404).json({ message: 'User or crop not found' });
    }

    const advisories = [];

    // Generate planting advisory
    if (isPlantingSeason(crop, weatherData)) {
      advisories.push({
        user: userId,
        crop: cropId,
        type: 'planting',
        title: `Planting advisory for ${crop.name}`,
        description: `It's the optimal time to plant ${crop.name}. Follow the recommended practices for best results.`,
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        weatherConditions: weatherData,
        soilConditions: soilData,
        recommendations: generatePlantingRecommendations(crop, soilData)
      });
    }

    // Generate irrigation advisory
    if (needsIrrigation(weatherData, soilData)) {
      advisories.push({
        user: userId,
        crop: cropId,
        type: 'irrigation',
        title: `Irrigation advisory for ${crop.name}`,
        description: `Your ${crop.name} crop needs irrigation. Follow the recommended watering schedule.`,
        priority: 'medium',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        weatherConditions: weatherData,
        soilConditions: soilData,
        recommendations: generateIrrigationRecommendations(crop, weatherData, soilData)
      });
    }

    // Generate fertilization advisory
    if (needsFertilization(soilData)) {
      advisories.push({
        user: userId,
        crop: cropId,
        type: 'fertilization',
        title: `Fertilization advisory for ${crop.name}`,
        description: `Your soil needs fertilization for optimal ${crop.name} growth.`,
        priority: 'medium',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        weatherConditions: weatherData,
        soilConditions: soilData,
        recommendations: generateFertilizationRecommendations(crop, soilData)
      });
    }

    // Generate pest control advisory
    if (needsPestControl(weatherData, crop)) {
      advisories.push({
        user: userId,
        crop: cropId,
        type: 'pest_control',
        title: `Pest control advisory for ${crop.name}`,
        description: `Monitor your ${crop.name} crop for common pests and diseases.`,
        priority: 'high',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        weatherConditions: weatherData,
        soilConditions: soilData,
        recommendations: generatePestControlRecommendations(crop, weatherData)
      });
    }

    // Save advisories
    const savedAdvisories = await Advisory.insertMany(advisories);

    res.json({
      message: 'Advisories generated successfully',
      advisories: savedAdvisories,
      count: savedAdvisories.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate advisories', error: error.message });
  }
});

// Helper functions
function isPlantingSeason(crop, weatherData) {
  const currentMonth = new Date().getMonth() + 1;
  const season = getSeason(currentMonth);
  return crop.season === season || crop.season === 'all';
}

function getSeason(month) {
  if (month >= 6 && month <= 10) return 'kharif';
  if (month >= 11 || month <= 3) return 'rabi';
  return 'zaid';
}

function needsIrrigation(weatherData, soilData) {
  return weatherData.rainfall < 10 && soilData.moisture < 40;
}

function needsFertilization(soilData) {
  return soilData.nitrogen < 20 || soilData.phosphorus < 10 || soilData.potassium < 50;
}

function needsPestControl(weatherData, crop) {
  return weatherData.humidity > 70 && weatherData.temperature > 25;
}

function generatePlantingRecommendations(crop, soilData) {
  return [
    {
      action: 'Prepare soil',
      description: 'Ensure proper soil preparation and drainage',
      timing: 'Before planting',
      materials: ['Organic compost', 'Fertilizer'],
      cost: 500
    },
    {
      action: 'Plant seeds',
      description: `Plant ${crop.name} seeds at recommended spacing`,
      timing: 'During planting window',
      materials: ['Seeds', 'Planting tools'],
      cost: 200
    }
  ];
}

function generateIrrigationRecommendations(crop, weatherData, soilData) {
  const frequency = crop.waterRequirement === 'high' ? 'Daily' : 
                   crop.waterRequirement === 'medium' ? 'Every 2-3 days' : 'Weekly';
  
  return [
    {
      action: 'Irrigation',
      description: `Water ${crop.name} as per requirement`,
      timing: frequency,
      materials: ['Water', 'Irrigation system'],
      cost: 100
    }
  ];
}

function generateFertilizationRecommendations(crop, soilData) {
  const recommendations = [];
  
  if (soilData.nitrogen < 20) {
    recommendations.push({
      action: 'Add nitrogen fertilizer',
      description: 'Apply nitrogen fertilizer to improve soil fertility',
      timing: 'Before planting',
      materials: ['Urea', 'NPK fertilizer'],
      cost: 300
    });
  }
  
  if (soilData.phosphorus < 10) {
    recommendations.push({
      action: 'Add phosphorus fertilizer',
      description: 'Apply phosphorus fertilizer for root development',
      timing: 'Before planting',
      materials: ['DAP', 'Superphosphate'],
      cost: 250
    });
  }
  
  return recommendations;
}

function generatePestControlRecommendations(crop, weatherData) {
  return [
    {
      action: 'Monitor for pests',
      description: 'Regularly check for signs of pest damage',
      timing: 'Weekly',
      materials: ['Pest identification guide', 'Magnifying glass'],
      cost: 50
    },
    {
      action: 'Apply preventive measures',
      description: 'Use organic pest control methods',
      timing: 'As needed',
      materials: ['Neem oil', 'Organic pesticides'],
      cost: 200
    }
  ];
}

module.exports = router;








