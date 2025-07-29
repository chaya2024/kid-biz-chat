const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: [true, 'מזהה נושא נדרש']
  },
  content: {
    type: String,
    required: [true, 'תוכן ההודעה נדרש'],
    trim: true,
    maxlength: [2000, 'הודעה לא יכולה להיות יותר מ-2000 תווים']
  },
  sender: {
    type: String,
    required: [true, 'שולח ההודעה נדרש'],
    enum: ['user', 'assistant'],
    default: 'user'
  },
  messageType: {
    type: String,
    enum: ['text', 'system', 'error'],
    default: 'text'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for better performance
messageSchema.index({ topicId: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });

// Update topic message count after save
messageSchema.post('save', async function() {
  try {
    const Topic = mongoose.model('Topic');
    const messageCount = await mongoose.model('Message').countDocuments({ topicId: this.topicId });
    await Topic.findByIdAndUpdate(this.topicId, { messageCount });
  } catch (error) {
    console.error('שגיאה בעדכון מספר הודעות:', error);
  }
});

module.exports = mongoose.model('Message', messageSchema);