const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const canvasRoutes = require('./routes/canvasRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is healthy' });
  });

  app.use('/api/canvases', canvasRoutes);

  app.use('/api/auth', authRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;