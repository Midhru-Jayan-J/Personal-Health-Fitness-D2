import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., 'gmail', 'yahoo', etc.)
  auth: {
    user: 'msaakaash@gmail.com', // Your email address
    pass: 'ljxw boor zfaj ewsv', // Your email password
  },
});

app.post('/send-email', (req, res) => {
  const { email, firstName } = req.body;

  const mailOptions = {
    from: 'msaakaash@gmail.com', // Sender address
    to: email, // List of recipients
    subject: 'Signup Successful', // Subject line
    text: `Hello ${firstName},\n\nYou have successfully signed up! Welcome to our platform!`, // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Failed to send email');
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).send('Email sent successfully');
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
