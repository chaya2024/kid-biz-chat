const express = require('express');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const Topic = require('../models/Topic');

const router = express.Router();

// Validation middleware
const validateMessage = [
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('תוכן ההודעה חייב להיות בין 1-2000 תווים'),
  body('topicId').isMongoId().withMessage('מזהה נושא לא תקין'),
  body('sender').isIn(['user', 'assistant']).withMessage('שולח לא תקין')
];

// GET /api/messages/:topicId - קבלת הודעות לנושא ספציפי
router.get('/:topicId', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const { topicId } = req.params;

    // בדיקה שהנושא קיים
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'נושא לא נמצא' });
    }

    const messages = await Message.find({ topicId })
      .sort({ createdAt: 1 }) // הודעות מוקדמות יותר קודם
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Message.countDocuments({ topicId });

    res.json({
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('שגיאה בקבלת הודעות:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'מזהה נושא לא תקין' });
    }
    res.status(500).json({ error: 'שגיאה בקבלת הודעות' });
  }
});

// POST /api/messages - יצירת הודעה חדשה
router.post('/', validateMessage, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'נתונים לא תקינים', 
        details: errors.array()
      });
    }

    const { content, topicId, sender, messageType, metadata } = req.body;

    // בדיקה שהנושא קיים
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'נושא לא נמצא' });
    }

    const message = new Message({
      content,
      topicId,
      sender,
      messageType: messageType || 'text',
      metadata: metadata || {}
    });

    await message.save();
    
    res.status(201).json(message);
  } catch (error) {
    console.error('שגיאה ביצירת הודעה:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'נתונים לא תקינים', 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ error: 'שגיאה ביצירת הודעה' });
  }
});

// GET /api/messages/message/:id - קבלת הודעה ספציפית
router.get('/message/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('topicId', 'title')
      .select('-__v');
    
    if (!message) {
      return res.status(404).json({ error: 'הודעה לא נמצאה' });
    }

    res.json(message);
  } catch (error) {
    console.error('שגיאה בקבלת הודעה:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'מזהה הודעה לא תקין' });
    }
    res.status(500).json({ error: 'שגיאה בקבלת הודעה' });
  }
});

// DELETE /api/messages/:id - מחיקת הודעה
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'הודעה לא נמצאה' });
    }

    res.json({ message: 'הודעה נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת הודעה:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'מזהה הודעה לא תקין' });
    }
    res.status(500).json({ error: 'שגיאה במחיקת הודעה' });
  }
});

module.exports = router;