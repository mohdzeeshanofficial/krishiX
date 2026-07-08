const express = require('express');
const router = express.Router();

// Get pest information
router.get('/info/:pestName', async (req, res) => {
  try {
    const { pestName } = req.params;
    
    // Mock pest database
    const pestDatabase = {
      'aphids': {
        name: 'Aphids',
        scientificName: 'Aphidoidea',
        description: 'Small, soft-bodied insects that feed on plant sap',
        symptoms: ['Curled leaves', 'Stunted growth', 'Honeydew secretion', 'Sooty mold'],
        damage: 'Reduces plant vigor and can transmit viral diseases',
        control: {
          biological: ['Ladybugs', 'Lacewings', 'Parasitic wasps'],
          chemical: ['Neem oil', 'Insecticidal soap', 'Pyrethrin'],
          cultural: ['Remove affected parts', 'Improve air circulation', 'Avoid over-fertilization']
        },
        prevention: [
          'Regular monitoring',
          'Maintain plant health',
          'Use resistant varieties',
          'Avoid over-fertilization'
        ],
        affectedCrops: ['Tomato', 'Pepper', 'Cabbage', 'Lettuce'],
        season: 'all',
        severity: 'medium'
      },
      'whitefly': {
        name: 'Whitefly',
        scientificName: 'Aleyrodidae',
        description: 'Small, white-winged insects that feed on plant sap',
        symptoms: ['Yellowing leaves', 'Sticky honeydew', 'Sooty mold', 'Leaf drop'],
        damage: 'Reduces photosynthesis and can transmit viral diseases',
        control: {
          biological: ['Encarsia formosa', 'Eretmocerus eremicus', 'Ladybugs'],
          chemical: ['Neem oil', 'Insecticidal soap', 'Pyriproxyfen'],
          cultural: ['Yellow sticky traps', 'Remove affected plants', 'Improve ventilation']
        },
        prevention: [
          'Use yellow sticky traps',
          'Maintain proper spacing',
          'Avoid over-watering',
          'Regular monitoring'
        ],
        affectedCrops: ['Tomato', 'Pepper', 'Cucumber', 'Eggplant'],
        season: 'all',
        severity: 'high'
      },
      'caterpillar': {
        name: 'Caterpillar',
        scientificName: 'Lepidoptera larvae',
        description: 'Larval stage of butterflies and moths that feed on leaves',
        symptoms: ['Holes in leaves', 'Defoliation', 'Frass (droppings)', 'Silk webbing'],
        damage: 'Can cause complete defoliation if not controlled',
        control: {
          biological: ['Bacillus thuringiensis (Bt)', 'Trichogramma wasps', 'Birds'],
          chemical: ['Spinosad', 'Pyrethrin', 'Carbaryl'],
          cultural: ['Hand picking', 'Remove affected leaves', 'Use row covers']
        },
        prevention: [
          'Use row covers',
          'Regular monitoring',
          'Remove weeds',
          'Attract beneficial insects'
        ],
        affectedCrops: ['Cabbage', 'Broccoli', 'Lettuce', 'Spinach'],
        season: 'all',
        severity: 'high'
      }
    };

    const pest = pestDatabase[pestName.toLowerCase()];
    if (!pest) {
      return res.status(404).json({ message: 'Pest not found' });
    }

    res.json(pest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pest information', error: error.message });
  }
});

// Detect pest from image (mock implementation)
router.post('/detect', async (req, res) => {
  try {
    const { imageData, cropType } = req.body;
    
    // Mock detection results
    const mockResults = {
      detectedPests: [
        {
          name: 'Aphids',
          confidence: 0.85,
          severity: 'medium',
          description: 'Small, soft-bodied insects detected on leaves'
        }
      ],
      recommendations: [
        {
          action: 'Apply neem oil spray',
          description: 'Spray neem oil solution on affected plants',
          timing: 'Early morning or evening',
          materials: ['Neem oil', 'Water', 'Spray bottle'],
          cost: 150
        },
        {
          action: 'Introduce beneficial insects',
          description: 'Release ladybugs to control aphid population',
          timing: 'Immediate',
          materials: ['Ladybugs', 'Release container'],
          cost: 300
        }
      ],
      prevention: [
        'Regular monitoring of plants',
        'Maintain proper plant spacing',
        'Avoid over-fertilization',
        'Use resistant varieties'
      ]
    };

    res.json(mockResults);
  } catch (error) {
    res.status(500).json({ message: 'Failed to detect pests', error: error.message });
  }
});

// Get pest control recommendations
router.post('/control', async (req, res) => {
  try {
    const { pestName, cropType, severity, organicOnly } = req.body;

    const controlMethods = {
      'aphids': {
        organic: [
          {
            method: 'Neem oil spray',
            description: 'Mix 2ml neem oil with 1 liter water and spray',
            frequency: 'Every 3-4 days',
            cost: 100
          },
          {
            method: 'Insecticidal soap',
            description: 'Spray soap solution on affected plants',
            frequency: 'Every 2-3 days',
            cost: 80
          },
          {
            method: 'Beneficial insects',
            description: 'Release ladybugs or lacewings',
            frequency: 'One-time release',
            cost: 500
          }
        ],
        chemical: [
          {
            method: 'Pyrethrin spray',
            description: 'Apply pyrethrin-based insecticide',
            frequency: 'As per label instructions',
            cost: 200
          }
        ]
      },
      'whitefly': {
        organic: [
          {
            method: 'Yellow sticky traps',
            description: 'Place yellow sticky traps around plants',
            frequency: 'Replace weekly',
            cost: 150
          },
          {
            method: 'Neem oil spray',
            description: 'Spray neem oil solution',
            frequency: 'Every 3-4 days',
            cost: 100
          }
        ],
        chemical: [
          {
            method: 'Pyriproxyfen',
            description: 'Apply growth regulator insecticide',
            frequency: 'As per label instructions',
            cost: 300
          }
        ]
      }
    };

    const methods = controlMethods[pestName.toLowerCase()] || controlMethods['aphids'];
    const recommendations = organicOnly ? methods.organic : [...methods.organic, ...methods.chemical];

    res.json({
      pestName,
      cropType,
      severity,
      recommendations,
      totalCost: recommendations.reduce((sum, rec) => sum + rec.cost, 0),
      timeline: generateControlTimeline(recommendations)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get control recommendations', error: error.message });
  }
});

// Get disease information
router.get('/disease/:diseaseName', async (req, res) => {
  try {
    const { diseaseName } = req.params;
    
    const diseaseDatabase = {
      'powdery_mildew': {
        name: 'Powdery Mildew',
        scientificName: 'Erysiphales',
        description: 'Fungal disease that appears as white powdery coating on leaves',
        symptoms: ['White powdery coating', 'Stunted growth', 'Leaf curling', 'Premature leaf drop'],
        causes: ['High humidity', 'Poor air circulation', 'Overcrowding', 'Cool temperatures'],
        treatment: {
          organic: ['Baking soda solution', 'Milk spray', 'Neem oil', 'Sulfur dust'],
          chemical: ['Fungicides containing myclobutanil', 'Propiconazole', 'Tebuconazole']
        },
        prevention: [
          'Improve air circulation',
          'Avoid overhead watering',
          'Plant resistant varieties',
          'Proper spacing'
        ],
        affectedCrops: ['Cucumber', 'Squash', 'Grape', 'Rose'],
        season: 'all',
        severity: 'medium'
      },
      'blight': {
        name: 'Blight',
        scientificName: 'Phytophthora infestans',
        description: 'Fungal disease that causes rapid plant death',
        symptoms: ['Dark spots on leaves', 'Rapid wilting', 'Stem lesions', 'Fruit rot'],
        causes: ['High humidity', 'Cool temperatures', 'Poor drainage', 'Overcrowding'],
        treatment: {
          organic: ['Copper fungicide', 'Baking soda solution', 'Remove affected plants'],
          chemical: ['Chlorothalonil', 'Mancozeb', 'Copper-based fungicides']
        },
        prevention: [
          'Improve drainage',
          'Avoid overhead watering',
          'Crop rotation',
          'Proper spacing'
        ],
        affectedCrops: ['Tomato', 'Potato', 'Pepper'],
        season: 'all',
        severity: 'high'
      }
    };

    const disease = diseaseDatabase[diseaseName.toLowerCase()];
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }

    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch disease information', error: error.message });
  }
});

// Generate pest monitoring schedule
router.post('/monitoring-schedule', async (req, res) => {
  try {
    const { cropType, season, farmSize } = req.body;

    const schedule = {
      frequency: 'Weekly',
      activities: [
        {
          day: 'Monday',
          activity: 'Visual inspection of leaves',
          focus: 'Check for aphids, whiteflies, and leaf damage',
          duration: '30 minutes'
        },
        {
          day: 'Wednesday',
          activity: 'Check soil moisture and drainage',
          focus: 'Prevent root rot and fungal diseases',
          duration: '20 minutes'
        },
        {
          day: 'Friday',
          activity: 'Monitor for caterpillars and beetles',
          focus: 'Look for holes in leaves and frass',
          duration: '25 minutes'
        },
        {
          day: 'Sunday',
          activity: 'Overall plant health assessment',
          focus: 'Check for any signs of stress or disease',
          duration: '45 minutes'
        }
      ],
      tools: [
        'Magnifying glass',
        'Notebook for records',
        'Camera for documentation',
        'Sticky traps',
        'pH meter'
      ],
      alerts: [
        'Set up alerts for high humidity days',
        'Monitor weather forecasts for pest-friendly conditions',
        'Check for pest outbreaks in nearby farms'
      ]
    };

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate monitoring schedule', error: error.message });
  }
});

// Helper functions
function generateControlTimeline(recommendations) {
  const timeline = [];
  const now = new Date();

  recommendations.forEach((rec, index) => {
    timeline.push({
      day: index + 1,
      date: new Date(now.getTime() + index * 24 * 60 * 60 * 1000),
      action: rec.method,
      description: rec.description,
      cost: rec.cost
    });
  });

  return timeline;
}

module.exports = router;








