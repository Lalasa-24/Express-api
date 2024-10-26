import nodemailer from 'nodemailer'; // Use ES module syntax if you're on Vercel

// Setup Nodemailer transport using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Use the EMAIL_USER environment variable
    pass: process.env.EMAIL_PASS, // Use the EMAIL_PASS environment variable
  },
});

// Main handler function
export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // Format the subject and body
    const mailSubject = `Portfolio: ${subject}`; // Subject starts with "Portfolio"
    const currentTime = new Date().toLocaleString(); // Get current date and time

    // Structure the email body
    const mailBody = `Name: ${name}\nEmail ID: ${email}\nThought: ${message}\nDate & Time: ${currentTime}`;

    const mailOptions = {
      from: email, // Sender's email
      to: process.env.RECEIVER_EMAIL || 'lalasaa24@gmail.com', // Use the RECEIVER_EMAIL variable or a default value
      subject: mailSubject, // Use the formatted subject
      text: mailBody, // Use the formatted body
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent: ' + info.response });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send the message. Please try again later.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
