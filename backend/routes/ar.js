const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get list of available AR models
router.get('/models', (req, res) => {
  try {
    const androidDir = path.join(__dirname, '../android');
    const iosDir = path.join(__dirname, '../ios');

    // Read Android models (.glb files)
    const androidModels = [];
    if (fs.existsSync(androidDir)) {
      const files = fs.readdirSync(androidDir);
      files.forEach(file => {
        if (file.endsWith('.glb')) {
          androidModels.push({
            name: file.replace('.glb', ''),
            filename: file,
            platform: 'android',
            extension: '.glb'
          });
        }
      });
    }

    // Read iOS models (.usdz files)
    const iosModels = [];
    if (fs.existsSync(iosDir)) {
      const files = fs.readdirSync(iosDir);
      files.forEach(file => {
        if (file.endsWith('.usdz')) {
          iosModels.push({
            name: file.replace('.usdz', ''),
            filename: file,
            platform: 'ios',
            extension: '.usdz'
          });
        }
      });
    }

    res.json({
      status: 'success',
      data: {
        android: androidModels,
        ios: iosModels,
        all: [...androidModels, ...iosModels]
      }
    });
  } catch (error) {
    console.error('AR models error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch AR models' });
  }
});

module.exports = router;
