const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set headers for CORS (optional, for development)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Check if the method is POST
  if (req.method === 'POST') {
    try {
      // Parse the JSON body manually (if Vercel doesn't do this automatically)
      let body = req.body;

      // Check if body is a string, and parse it
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      // Extract 'photo' from the body
      const { photo } = body;

      // Check if 'photo' is undefined or empty
      if (!photo) {
        console.log('No photo data received');
        return res.status(400).json({ success: false, message: 'No photo data received' });
      }

      // Set up the email transporter (using Gmail)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aleksadiscord1@gmail.com',
          pass: 'vamrkaxmpltrifsf', // Use your actual app password here
        },
      });

      // Set up the email content with the base64-encoded photo
      const mailOptions = {
        from: 'aleksadiscord1@gmail.com',
        to: 'aleksatomic2008@gmail.com',
        subject: 'Captured Photo',
        text: 'Here is the captured photo.',
        attachments: [
          {
            filename: 'photo.jpg',
            content: photo.split(';base64,')[1],  // Extract the base64 content, removing the prefix
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
