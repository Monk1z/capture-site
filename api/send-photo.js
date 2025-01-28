const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ensure it's a POST request
  if (req.method === 'POST') {
    try {
      // If the body is not automatically parsed, we parse it manually
      let body = req.body;

      // If no body is received, return an error
      if (!body) {
        console.log('No body received');
        return res.status(400).json({ success: false, message: 'No body received' });
      }

      // If Vercel doesn't parse JSON automatically, we can manually parse it
      if (typeof body === 'string') {
        body = JSON.parse(body);  // Parse the JSON string if needed
      }

      // Log the entire request body to verify what is received
      console.log('Request Body:', body);

      // Extract photo from the body
      let photo = body.photo;

      // If no photo is received, send an error response
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

      // Set up email options with the base64 image as an attachment
      const mailOptions = {
        from: 'aleksadiscord1@gmail.com',
        to: 'aleksatomic2008@gmail.com',
        subject: 'Captured Photo',
        text: 'Here is the captured photo.',
        attachments: [
          {
            filename: 'photo.jpg',
            content: photo.split(';base64,')[1],  // Remove the base64 prefix to get pure base64 content
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
    // Handle non-POST requests
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
