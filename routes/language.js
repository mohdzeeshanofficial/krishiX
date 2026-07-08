const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Get supported languages
router.get('/supported', (req, res) => {
  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];
  
  res.json(supportedLanguages);
});

// Get translations for a specific language
router.get('/translations/:lang', (req, res) => {
  try {
    const { lang } = req.params;
    const filePath = path.join(__dirname, '..', 'locales', `${lang}.json`);
    
    if (fs.existsSync(filePath)) {
      const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.json(translations);
    } else {
      res.status(404).json({ message: 'Language not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to load translations', error: error.message });
  }
});

// Get language-specific crop data
router.get('/crops/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const Crop = require('../models/Crop');
    
    // Get all crops
    const crops = await Crop.find({});
    
    // If language is English, return as is
    if (lang === 'en') {
      return res.json(crops);
    }
    
    // For other languages, we would need to implement translation logic
    // For now, return crops with basic translations
    const translatedCrops = crops.map(crop => {
      const translated = crop.toObject();
      
      // Add language-specific names and descriptions
      if (lang === 'hi') {
        translated.localizedName = getHindiCropName(crop.name);
        translated.localizedDescription = getHindiCropDescription(crop.name);
      } else if (lang === 'te') {
        translated.localizedName = getTeluguCropName(crop.name);
        translated.localizedDescription = getTeluguCropDescription(crop.name);
      } else if (lang === 'bn') {
        translated.localizedName = getBengaliCropName(crop.name);
        translated.localizedDescription = getBengaliCropDescription(crop.name);
      }
      
      return translated;
    });
    
    res.json(translatedCrops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get crops', error: error.message });
  }
});

// Helper functions for crop name translations
function getHindiCropName(englishName) {
  const translations = {
    'Rice': 'चावल',
    'Wheat': 'गेहूं',
    'Tomato': 'टमाटर',
    'Maize': 'मक्का',
    'Potato': 'आलू',
    'Sugarcane': 'गन्ना'
  };
  return translations[englishName] || englishName;
}

function getTeluguCropName(englishName) {
  const translations = {
    'Rice': 'వరి',
    'Wheat': 'గోధుమ',
    'Tomato': 'టమాట',
    'Maize': 'మొక్కజొన్న',
    'Potato': 'బంగాళదుంప',
    'Sugarcane': 'చెరకు'
  };
  return translations[englishName] || englishName;
}

function getBengaliCropName(englishName) {
  const translations = {
    'Rice': 'ধান',
    'Wheat': 'গম',
    'Tomato': 'টমেটো',
    'Maize': 'ভুট্টা',
    'Potato': 'আলু',
    'Sugarcane': 'আখ'
  };
  return translations[englishName] || englishName;
}

function getHindiCropDescription(englishName) {
  const descriptions = {
    'Rice': 'चावल एक मुख्य खाद्य फसल है जो बाढ़ की स्थिति में उगाई जाती है।',
    'Wheat': 'गेहूं सर्दियों के मौसम में उगाई जाने वाली प्रमुख अनाज फसल है।',
    'Tomato': 'टमाटर उच्च बाजार मांग वाली लोकप्रिय सब्जी फसल है।',
    'Maize': 'मक्का भोजन, चारा और औद्योगिक उपयोग के लिए बहुमुखी फसल है।',
    'Potato': 'आलू उच्च पोषण मूल्य वाली प्रमुख खाद्य फसल है।',
    'Sugarcane': 'गन्ना चीनी उत्पादन के लिए प्रमुख नकदी फसल है।'
  };
  return descriptions[englishName] || '';
}

function getTeluguCropDescription(englishName) {
  const descriptions = {
    'Rice': 'వరి అనేది వరద పరిస్థితులలో పెరిగే ప్రధాన ఆహార పంట.',
    'Wheat': 'గోధుమ చలికాలంలో పెరిగే ప్రధాన ధాన్య పంట.',
    'Tomato': 'టమాట అధిక మార్కెట్ డిమాండ్ ఉన్న ప్రజాదరణ పొందిన కూరగాయల పంట.',
    'Maize': 'మొక్కజొన్న ఆహారం, మేత మరియు పరిశ్రమల కోసం బహుముఖ పంట.',
    'Potato': 'బంగాళదుంప అధిక పోషక విలువ ఉన్న ప్రధాన ఆహార పంట.',
    'Sugarcane': 'చెరకు చక్కెర ఉత్పత్తికి ప్రధాన నగదు పంట.'
  };
  return descriptions[englishName] || '';
}

function getBengaliCropDescription(englishName) {
  const descriptions = {
    'Rice': 'ধান একটি প্রধান খাদ্য ফসল যা বন্যার অবস্থায় চাষ করা হয়।',
    'Wheat': 'গম শীতকালে চাষ করা হয় এমন একটি প্রধান শস্য ফসল।',
    'Tomato': 'টমেটো উচ্চ বাজার চাহিদা সহ একটি জনপ্রিয় সবজি ফসল।',
    'Maize': 'ভুট্টা খাদ্য, চারণ এবং শিল্পের জন্য একটি বহুমুখী ফসল।',
    'Potato': 'আলু উচ্চ পুষ্টিমূল্য সহ একটি প্রধান খাদ্য ফসল।',
    'Sugarcane': 'আখ চিনি উৎপাদনের জন্য একটি প্রধান নগদ ফসল।'
  };
  return descriptions[englishName] || '';
}

module.exports = router;








