const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'כותרת נדרשת'],
    trim: true,
    maxlength: [200, 'כותרת לא יכולה להיות יותר מ-200 תווים']
  },
  description: {
    type: String,
    required: [true, 'תיאור נדרש'],
    trim: true,
    maxlength: [1000, 'תיאור לא יכול להיות יותר מ-1000 תווים']
  },
  scenario: {
    type: String,
    required: [true, 'תרחיש נדרש'],
    trim: true,
    maxlength: [2000, 'תרחיש לא יכול להיות יותר מ-2000 תווים']
  },
  flow: {
    type: [{
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true,
        enum: ['message', 'question', 'decision', 'action']
      },
      content: {
        type: String,
        required: true
      },
      speaker: String,
      delay: {
        type: Number,
        default: 0
      },
      options: [String]
    }],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  messageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
topicSchema.index({ title: 1 });
topicSchema.index({ createdAt: -1 });
topicSchema.index({ isActive: 1 });

module.exports = mongoose.model('Topic', topicSchema);