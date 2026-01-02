const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory = [], systemPrompt, fileData } = req.body;

    if (!message) {
      return res.status(400).json({ status: 'error', message: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = systemPrompt || 'You are a helpful AI assistant for education.';

    // Build conversation history
    let conversation = prompt + '\n\n';

    chatHistory.forEach(item => {
      conversation += `User: ${item.user}\nAI: ${item.ai}\n`;
    });

    conversation += `User: ${message}\nAI:`;

    const result = await model.generateContent(conversation);
    const response = await result.response;
    const text = response.text();

    res.json({ status: 'success', text });
  } catch (error) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to generate response' });
  }
});

// Diagram generation endpoint
router.post('/diagram', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ status: 'error', message: 'Description is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a Mermaid diagram code for the following description. Only return the Mermaid code, no explanations:\n\n${description}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const mermaidCode = response.text().trim();

    res.json({ status: 'success', mermaidCode });
  } catch (error) {
    console.error('Gemini diagram error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to generate diagram' });
  }
});

module.exports = router;
