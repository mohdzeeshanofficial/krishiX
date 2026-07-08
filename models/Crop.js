const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  scientificName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['cereal', 'pulse', 'oilseed', 'vegetable', 'fruit', 'spice', 'fiber'],
    required: true
  },
  season: {
    type: String,
    enum: ['kharif', 'rabi', 'zaid', 'all'],
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  soilTypes: [{
    type: String,
    enum: ['clay', 'sandy', 'loamy', 'silty', 'peaty', 'chalky']
  }],
  temperature: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    optimal: { type: Number, required: true }
  },
  rainfall: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    optimal: { type: Number, required: true }
  },
  ph: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    optimal: { type: Number, required: true }
  },
  waterRequirement: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  nutrients: {
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true }
  },
  plantingTime: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  harvestingTime: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  yield: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    unit: { type: String, default: 'kg/hectare' }
  },
  marketPrice: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    unit: { type: String, default: 'INR/kg' }
  },
  diseases: [{
    name: String,
    symptoms: String,
    treatment: String,
    prevention: String
  }],
  pests: [{
    name: String,
    damage: String,
    control: String,
    prevention: String
  }],
  cultivationTips: [String],
  images: [String],
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema);








