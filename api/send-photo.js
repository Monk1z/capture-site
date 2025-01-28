const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Allow all origins (you can restrict to your frontend domain later)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ensure it's a POST request
  if (req.method === 'POST') {
    const { photo } = req.body;

    // Log to see if photo data is received
    console.log('Received photo data:', photo);

    // Check if photo data is provided
    if (!photo) {
      console.log('No photo data received');
      return res.status(400).json({ success: false, message: 'No photo data received' });
    }

    // Set up the transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aleksadiscord1@gmail.com',
        pass: 'vamr kaxm pltr ifsf', // Make sure to use your app password here
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

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Photo sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);  // Log the error for further debugging
      return res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
    }
  } else {
    // Return 405 if the method is not POST
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
