const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const geminiRoutes = require('./routes/gemini');
const nasaRoutes = require('./routes/nasa');
const emailRoutes = require('./routes/email');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/gemini', geminiRoutes);
app.use('/api/nasa', nasaRoutes);
app.use('/api/email', emailRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
