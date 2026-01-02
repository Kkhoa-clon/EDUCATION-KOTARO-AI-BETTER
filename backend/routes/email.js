const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');

const router = express.Router();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Verify reCAPTCHA (optional)
const verifyRecaptcha = async (token) => {
  if (!token || !process.env.RECAPTCHA_SECRET) return true; // Skip if not configured

  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET,
        response: token
      }
    });
    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

// Send email endpoint
router.post('/send', async (req, res) => {
  try {
    const { user_email, message, recaptcha_token } = req.body;

    if (!user_email || !message) {
      return res.status(400).json({ status: 'error', message: 'Email and message are required' });
    }

    // Verify reCAPTCHA if token provided
    if (recaptcha_token) {
      const isValidCaptcha = await verifyRecaptcha(recaptcha_token);
      if (!isValidCaptcha) {
        return res.status(400).json({ status: 'error', message: 'Invalid reCAPTCHA' });
      }
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Contact Form Submission - Education Kotaro AI',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${user_email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from Education Kotaro AI website</em></p>
      `,
      replyTo: user_email
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: 'success', message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email' });
  }
});

module.exports = router;
