const express = require('express');
const axios = require('axios');

const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1';

// Get available rovers
router.get('/rovers', async (req, res) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/rovers`, {
      params: { api_key: NASA_API_KEY }
    });

    res.json({ status: 'success', data: response.data.rovers });
  } catch (error) {
    console.error('NASA rovers error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch rovers' });
  }
});

// Get photos from a rover (legacy path for compatibility)
router.get('/rovers/:rover/photos', async (req, res) => {
  try {
    const { rover } = req.params;
    const { camera, earth_date, sol, page } = req.query;

    const params = { api_key: NASA_API_KEY };

    if (camera) params.camera = camera;
    if (earth_date) params.earth_date = earth_date;
    if (sol) params.sol = parseInt(sol);
    if (page) params.page = parseInt(page);

    const response = await axios.get(`${NASA_BASE_URL}/rovers/${rover}/photos`, { params });

    res.json(response.data);
  } catch (error) {
    console.error('NASA mars photos error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch Mars photos' });
  }
});

module.exports = router;
