const mongoose = require('mongoose');

const advisorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  type: {
    type: String,
    enum: ['planting', 'irrigation', 'fertilization', 'pest_control', 'harvesting', 'general'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  },
  weatherConditions: {
    temperature: Number,
    humidity: Number,
    rainfall: Number,
    windSpeed: Number
  },
  soilConditions: {
    moisture: Number,
    ph: Number,
    nutrients: {
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number
    }
  },
  recommendations: [{
    action: String,
    description: String,
    timing: String,
    materials: [String],
    cost: Number
  }],
  resources: [{
    type: String,
    url: String,
    title: String
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    helpful: Boolean
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Advisory', advisorySchema);








