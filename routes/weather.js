const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get current weather
router.get('/current/:location', async (req, res) => {
  try {
    const { location } = req.params;
    
    // In a real implementation, you would use a weather API like OpenWeatherMap
    // For demo purposes, we'll return mock data
    const mockWeatherData = {
      location,
      temperature: 28,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      condition: 'sunny',
      timestamp: new Date(),
      forecast: [
        { date: new Date(Date.now() + 24 * 60 * 60 * 1000), temperature: 30, rainfall: 0, condition: 'sunny' },
        { date: new Date(Date.now() + 48 * 60 * 60 * 1000), temperature: 26, rainfall: 5, condition: 'partly_cloudy' },
        { date: new Date(Date.now() + 72 * 60 * 60 * 1000), temperature: 24, rainfall: 15, condition: 'rainy' }
      ]
    };

    res.json(mockWeatherData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data', error: error.message });
  }
});

// Get weather forecast
router.get('/forecast/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { days = 7 } = req.query;

    // Mock forecast data
    const forecast = [];
    for (let i = 0; i < days; i++) {
      forecast.push({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        temperature: {
          min: 20 + Math.random() * 10,
          max: 25 + Math.random() * 10
        },
        humidity: 50 + Math.random() * 30,
        rainfall: Math.random() * 20,
        windSpeed: 5 + Math.random() * 15,
        condition: ['sunny', 'cloudy', 'rainy', 'partly_cloudy'][Math.floor(Math.random() * 4)]
      });
    }

    res.json({ location, forecast });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather forecast', error: error.message });
  }
});

// Get weather-based crop recommendations
router.post('/crop-recommendations', async (req, res) => {
  try {
    const { location, temperature, humidity, rainfall, windSpeed } = req.body;

    // Analyze weather conditions and provide recommendations
    const recommendations = [];

    if (temperature > 35) {
      recommendations.push({
        type: 'warning',
        message: 'High temperature detected. Consider providing shade or irrigation.',
        action: 'Increase irrigation frequency and provide shade if possible.'
      });
    }

    if (humidity > 80) {
      recommendations.push({
        type: 'warning',
        message: 'High humidity detected. Risk of fungal diseases.',
        action: 'Monitor crops for signs of fungal diseases and apply preventive measures.'
      });
    }

    if (rainfall > 50) {
      recommendations.push({
        type: 'warning',
        message: 'Heavy rainfall expected. Risk of waterlogging.',
        action: 'Ensure proper drainage and avoid overwatering.'
      });
    }

    if (windSpeed > 20) {
      recommendations.push({
        type: 'warning',
        message: 'Strong winds detected. Risk of crop damage.',
        action: 'Secure crops and consider windbreaks.'
      });
    }

    if (temperature >= 20 && temperature <= 30 && humidity >= 40 && humidity <= 70) {
      recommendations.push({
        type: 'positive',
        message: 'Optimal weather conditions for most crops.',
        action: 'Good time for planting and crop maintenance.'
      });
    }

    res.json({
      weather: { temperature, humidity, rainfall, windSpeed },
      recommendations,
      riskLevel: calculateRiskLevel(temperature, humidity, rainfall, windSpeed)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze weather', error: error.message });
  }
});

// Calculate risk level based on weather conditions
function calculateRiskLevel(temperature, humidity, rainfall, windSpeed) {
  let riskScore = 0;

  if (temperature > 35 || temperature < 5) riskScore += 3;
  if (humidity > 85 || humidity < 20) riskScore += 2;
  if (rainfall > 50) riskScore += 3;
  if (windSpeed > 25) riskScore += 2;

  if (riskScore >= 8) return 'high';
  if (riskScore >= 5) return 'medium';
  return 'low';
}

module.exports = router;








