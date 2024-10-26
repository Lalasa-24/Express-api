const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Email Service API!');
});

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (Gmail, Outlook, etc.)
  auth: {
    user: 'senderexample02@gmail.com', // Replace with your email
    pass: 'siaz bukk kwug ltye', // Replace with your email password or app password
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Format the subject and body
  const mailSubject = `Portfolio: ${subject}`; // Subject starts with "Portfolio"
  const currentTime = new Date().toLocaleString(); // Get current date and time

  // Structure the email body
  const mailBody = `Name: ${name}\nEmail ID: ${email}\nThought: ${message}\nDate & Time: ${currentTime}`;

  const mailOptions = {
    from: email, // Sender's email
    to: 'lalasaa24@gmail.com', // Replace with your email where you want to receive
    subject: mailSubject, // Use the formatted subject
    text: mailBody, // Use the formatted body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send the message. Please try again later.');
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
