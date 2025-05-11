// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // This will load environment variables from a .env file

const app = express();
app.use(express.json());
app.use(cors()); 

// Use environment variables for sensitive data
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // Use EMAIL_USER from the .env file
    pass: process.env.EMAIL_PASS    // Use EMAIL_PASS from the .env file
  }
});

// Function to send email
async function sendMail(formData) {
  const mailOptions = {
    from: formData.email,
    to: 'sanmathisedhupathi2004@gmail.com', 
    subject: 'Contact Form Submission',
    text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
  };

  await transporter.sendMail(mailOptions);
}

// Route to handle email sending
app.post('/api/send', async (req, res) => {
  try {
    await sendMail(req.body);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

const PORT = 3033;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
