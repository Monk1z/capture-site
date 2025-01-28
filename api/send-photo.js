	const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Email transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aleksadiscord1@gmail.com',  // Sender email
    pass: process.env.GMAIL_APP_PASSWORD,  // Gmail App Password (use environment variable for security)
  },
});

module.exports = async (req, res) => {
  // Allow any origin (you can restrict this for production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    // Handle the POST request here (sending the email, saving photo, etc.)
    const { photo } = req.body;

    if (!photo) {
      return res.status(400).json({ success: false, message: 'No photo data received' });
    }

    // Process the photo and send the email...
    // (Your logic to process the photo and email)

    return res.status(200).json({ success: true, message: 'Photo sent successfully!' });
  } else {
    // Respond with a 405 if the method is not POST
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};