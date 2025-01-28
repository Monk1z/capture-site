const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set headers for CORS (optional, for development)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ensure the request is POST
  if (req.method === 'POST') {
    try {
      // Parse the incoming request body as JSON
      const { photo } = req.body;

      // Check if 'photo' exists in the body
      if (!photo) {
        console.log('No photo data received');
        return res.status(400).json({ success: false, message: 'No photo data received' });
      }

      // Set up the email transporter (using Gmail in this case)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aleksadiscord1@gmail.com',
          pass: 'vamrkaxmpltrifsf', // Use your actual app password here
        },
      });

      // Set up the email content
      const mailOptions = {
        from: 'aleksadiscord1@gmail.com',
        to: 'aleksatomic2008@gmail.com',
        subject: 'Captured Photo',
        text: 'Here is the captured photo.',
        attachments: [
          {
            filename: 'photo.jpg',
            content: photo.split(';base64,')[1],  // Strip out the base64 metadata (before the comma)
            encoding: 'base64',
          },
        ],
      };

      console.log('Sending email...');

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return res.status(200).json({ success: true, message: 'Photo sent successfully!' });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
