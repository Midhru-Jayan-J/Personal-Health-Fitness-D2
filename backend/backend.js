const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./keys/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com', // Set your email
    pass: 'your-email-password',  // Set your email app password
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

let otpStore = {}; // Store OTP temporarily

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, firstname, lastname, phone_number, email, gender, password } = req.body;
  try {
    const userAlreadyExist = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
    if (userAlreadyExist.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query(
      'INSERT INTO "USERS" (username, firstname, lastname, phone_number, email, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [username, firstname, lastname, phone_number, email, gender, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint (generates OTP)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate OTP and store temporarily
    const otp = generateOTP();
    otpStore[email] = otp;

    // Send OTP via email
    const mailOptions = {
      from: 'aravindkrishnasv@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP and generate JWT token
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    const user = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
    const payload = {
      id: user.rows[0].id,
      firstname: user.rows[0].firstname,
      lastname: user.rows[0].lastname,
      email: user.rows[0].email,
    };

    // Generate token after OTP verification
    const token = jwt.sign(payload, 'secret', { expiresIn: 7200 });
    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified', token: `Bearer ${token}` });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
