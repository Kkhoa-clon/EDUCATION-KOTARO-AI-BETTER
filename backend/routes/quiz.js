const express = require('express');
const axios = require('axios');
const he = require('he');

const router = express.Router();

// Function to translate text to Vietnamese
const translateToVietnamese = async (text) => {
  try {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: {
        client: 'gtx',
        sl: 'en',
        tl: 'vi',
        dt: 't',
        q: text
      }
    });
    return response.data[0][0][0];
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
};

// Function to decode HTML entities
const decodeHtmlEntities = (text) => {
  return he.decode(text);
};

// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Generate quiz questions
router.post('/generate', async (req, res) => {
  try {
    const { amount = 10, category, difficulty, type } = req.body;
    console.log('Request body:', req.body);

    // Build OpenTDB API URL
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;

    // Call OpenTDB API
    const response = await axios.get(url);
    const data = response.data;
    console.log('OpenTDB response:', data);

    if (data.response_code !== 0) {
      let message = 'Failed to fetch questions from OpenTDB';
      switch (data.response_code) {
        case 1:
          message = 'Không đủ câu hỏi cho các tùy chọn đã chọn. Hãy thử giảm số lượng câu hỏi hoặc chọn chủ đề khác.';
          break;
        case 2:
          message = 'Tham số không hợp lệ.';
          break;
        case 3:
          message = 'Session token không tìm thấy.';
          break;
        case 4:
          message = 'Session token đã hết câu hỏi.';
          break;
      }
      return res.status(400).json({ status: 'error', message });
    }

    // Process questions
    const processedQuestions = await Promise.all(data.results.map(async (q, index) => {
      // Decode HTML entities
      const question = decodeHtmlEntities(q.question);
      const correctAnswer = decodeHtmlEntities(q.correct_answer);
      const incorrectAnswers = q.incorrect_answers.map(ans => decodeHtmlEntities(ans));

      // Translate to Vietnamese
      const translatedQuestion = await translateToVietnamese(question);
      const translatedCorrect = await translateToVietnamese(correctAnswer);
      const translatedIncorrect = await Promise.all(incorrectAnswers.map(ans => translateToVietnamese(ans)));

      // Prepare answers array
      let answers = [translatedCorrect, ...translatedIncorrect];

      // Shuffle answers
      answers = shuffleArray(answers);

      return {
        id: `q${index + 1}`,
        question: translatedQuestion,
        answers: answers,
        correctAnswer: translatedCorrect
      };
    }));

    res.json({
      status: 'success',
      questions: processedQuestions,
      total: processedQuestions.length
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to generate quiz' });
  }
});

module.exports = router;