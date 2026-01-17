const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const os = require('os');
const geminiRoutes = require('./routes/gemini');
const nasaRoutes = require('./routes/nasa');
const emailRoutes = require('./routes/email');
const quizRoutes = require('./routes/quiz');

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
app.use('/api/mars', nasaRoutes); // Alias for mars routes
app.use('/api/email', emailRoutes);
app.use('/api/quiz', quizRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

const HOST = process.env.HOST || '0.0.0.0';

// Hàm lấy địa chỉ IP LAN
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Bỏ qua IPv6 và internal (loopback) addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log('\n========================================');
  console.log('🚀 Server đang chạy!');
  console.log('========================================');
  console.log(`📍 Local:    http://localhost:${PORT}`);
  console.log(`🌐 LAN:      http://${localIP}:${PORT}`);
  console.log('========================================\n');
});

module.exports = app;
