const express = require('express');
const Crop = require('../models/Crop');
const User = require('../models/User');
const Advisory = require('../models/Advisory');
const router = express.Router();

// Get all crops
router.get('/', async (req, res) => {
  try {
    const { category, season, soilType } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (season) filter.season = season;
    if (soilType) filter.soilTypes = soilType;

    const crops = await Crop.find(filter);
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch crops', error: error.message });
  }
});

// Get crop by ID
router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch crop', error: error.message });
  }
});

// Get recommended crops for user
router.post('/recommend', async (req, res) => {
  try {
    const { location, soilType, farmSize, season, temperature, rainfall, ph } = req.body;

    // Get all crops
    const allCrops = await Crop.find({});

    // Score crops based on compatibility
    const scoredCrops = allCrops.map(crop => {
      let score = 0;
      let reasons = [];

      // Soil type compatibility
      if (crop.soilTypes.includes(soilType)) {
        score += 30;
        reasons.push(`Compatible with ${soilType} soil`);
      }

      // Season compatibility
      if (crop.season === season || crop.season === 'all') {
        score += 25;
        reasons.push(`Suitable for ${season} season`);
      }

      // Temperature compatibility
      if (temperature >= crop.temperature.min && temperature <= crop.temperature.max) {
        score += 20;
        reasons.push(`Temperature range suitable (${crop.temperature.min}-${crop.temperature.max}°C)`);
      }

      // Rainfall compatibility
      if (rainfall >= crop.rainfall.min && rainfall <= crop.rainfall.max) {
        score += 15;
        reasons.push(`Rainfall suitable (${crop.rainfall.min}-${crop.rainfall.max}mm)`);
      }

      // pH compatibility
      if (ph >= crop.ph.min && ph <= crop.ph.max) {
        score += 10;
        reasons.push(`pH level suitable (${crop.ph.min}-${crop.ph.max})`);
      }

      return {
        crop,
        score,
        reasons,
        profitability: calculateProfitability(crop)
      };
    });

    // Sort by score and return top recommendations
    const recommendations = scoredCrops
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .filter(rec => rec.score > 0);

    res.json({
      recommendations,
      totalCrops: allCrops.length,
      criteria: {
        location,
        soilType,
        farmSize,
        season,
        temperature,
        rainfall,
        ph
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get recommendations', error: error.message });
  }
});

// Add crop to user's farm
router.post('/add-to-farm', async (req, res) => {
  try {
    const { userId, cropId, plantingDate, area } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Add crop to user's crops array
    if (!user.crops.includes(cropId)) {
      user.crops.push(cropId);
      await user.save();
    }

    // Create advisory for the crop
    const advisory = new Advisory({
      user: userId,
      crop: cropId,
      type: 'planting',
      title: `Planting advisory for ${crop.name}`,
      description: `Start planting ${crop.name} in your farm. Follow the recommended practices for optimal yield.`,
      dueDate: new Date(plantingDate),
      recommendations: [
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
      ]
    });

    await advisory.save();

    res.json({ message: 'Crop added to farm successfully', advisory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add crop to farm', error: error.message });
  }
});

// Get user's crops
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('crops');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.crops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user crops', error: error.message });
  }
});

// Calculate profitability score
function calculateProfitability(crop) {
  const yieldScore = (crop.yield.min + crop.yield.max) / 2;
  const priceScore = (crop.marketPrice.min + crop.marketPrice.max) / 2;
  const durationScore = 100 - crop.duration; // Shorter duration is better
  
  return {
    yield: yieldScore,
    price: priceScore,
    duration: durationScore,
    total: (yieldScore * priceScore) / 100 + durationScore
  };
}

module.exports = router;








