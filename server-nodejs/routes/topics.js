const express = require('express');
const { body, validationResult } = require('express-validator');
const Topic = require('../models/Topic');
const Message = require('../models/Message');

const router = express.Router();

// Validation middleware
const validateTopic = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('כותרת חייבת להיות בין 1-200 תווים'),
  body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('תיאור חייב להיות בין 1-1000 תווים'),
  body('scenario').trim().isLength({ min: 1, max: 2000 }).withMessage('תרחיש חייב להיות בין 1-2000 תווים'),
  body('flow').optional().isArray().withMessage('זרימה חייבת להיות מערך')
];

// GET /api/topics - קבלת כל הנושאים
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, active } = req.query;
    const filter = {};
    
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const topics = await Topic.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Topic.countDocuments(filter);

    res.json({
      topics,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('שגיאה בקבלת נושאים:', error);
    res.status(500).json({ error: 'שגיאה בקבלת נושאים' });
  }
});

// GET /api/topics/:id - קבלת נושא ספציפי
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).select('-__v');
    
    if (!topic) {
      return res.status(404).json({ error: 'נושא לא נמצא' });
    }

    res.json(topic);
  } catch (error) {
    console.error('שגיאה בקבלת נושא:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'מזהה נושא לא תקין' });
    }
    res.status(500).json({ error: 'שגיאה בקבלת נושא' });
  }
});

// POST /api/topics - יצירת נושא חדש
router.post('/', validateTopic, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'נתונים לא תקינים', 
        details: errors.array()
      });
    }

    const { title, description, scenario, flow } = req.body;
    
    const topic = new Topic({
      title,
      description,
      scenario,
      flow: flow || []
    });

    await topic.save();
    
    res.status(201).json(topic);
  } catch (error) {
    console.error('שגיאה ביצירת נושא:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'נתונים לא תקינים', 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ error: 'שגיאה ביצירת נושא' });
  }
});

// PUT /api/topics/:id - עדכון נושא
router.put('/:id', validateTopic, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'נתונים לא תקינים', 
        details: errors.array()
      });
    }

    const { title, description, scenario, flow, isActive } = req.body;
    
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { title, description, scenario, flow, isActive },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!topic) {
      return res.status(404).json({ error: 'נושא לא נמצא' });
    }

    res.json(topic);
  } catch (error) {
    console.error('שגיאה בעדכון נושא:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'מזהה נושא לא תקין' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'נתונים לא תקינים', 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ error: 'שגיאה בעדכון נושא' });
  }
});

// DELETE /api/topics/:id - מחיקת נושא
router.delete('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ error: 'נושא לא נמצא' });
    }

    // מחיקת כל ההודעות של הנושא
    await Message.deleteMany({ topicId: req.params.id });

    res.json({ message: 'נושא נמחק בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת נושא:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'מזהה נושא לא תקין' });
    }
    res.status(500).json({ error: 'שגיאה במחיקת נושא' });
  }
});

module.exports = router;