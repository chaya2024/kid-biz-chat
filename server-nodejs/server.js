const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/discussion_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB מחובר בהצלחה');
  } catch (error) {
    console.error('שגיאה בחיבור ל-MongoDB:', error.message);
    process.exit(1);
  }
};

// Routes
app.use('/api/topics', require('./routes/topics'));
app.use('/api/messages', require('./routes/messages'));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'השרת פועל בהצלחה', 
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'שגיאה פנימית בשרת',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'המסלול לא נמצא' });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`השרת פועל על פורט ${PORT}`);
    console.log(`בריאות השרת: http://localhost:${PORT}/api/health`);
  });
};

startServer();