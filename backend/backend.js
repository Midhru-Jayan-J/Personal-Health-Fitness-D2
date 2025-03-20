const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./keys/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const speakeasy = require('speakeasy');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(cors(corsOptions));
app.use(express.json());

// 2FA - Register
app.post('/2fa/register', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userId = req.user.id;
    try {
        const secret = speakeasy.generateSecret({ length: 20 });
        await pool.query('INSERT INTO "2FA" (user_id, secret, verified) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET secret = $2, verified = false', [userId, secret.base32, false]);
        res.json({ secret: secret.base32, otpauth_url: secret.otpauth_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2FA - Verify
app.post('/2fa/verify', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { token } = req.body;
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM "2FA" WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '2FA not configured' });
        }
        const verified = speakeasy.totp.verify({
            secret: result.rows[0].secret,
            encoding: 'base32',
            token,
            window: 1
        });
        if (verified) {
            await pool.query('UPDATE "2FA" SET verified = true WHERE user_id = $1', [userId]);
            res.json({ verified: true });
        } else {
            res.status(401).json({ verified: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2FA - Validate Token for Sensitive Operations
app.post('/2fa/validate', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { token } = req.body;
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM "2FA" WHERE user_id = $1 AND verified = true', [userId]);
        if (result.rows.length === 0) {
            return res.status(403).json({ error: '2FA not enabled or verified' });
        }
        const valid = speakeasy.totp.verify({
            secret: result.rows[0].secret,
            encoding: 'base32',
            token,
            window: 1
        });
        if (valid) {
            res.json({ validated: true });
        } else {
            res.status(401).json({ validated: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modify Login Endpoint to Enforce 2FA
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

        // Check if 2FA is verified
        const twoFAResult = await pool.query('SELECT * FROM "2FA" WHERE user_id = $1 AND verified = true', [result.rows[0].id]);
        if (twoFAResult.rows.length === 0) {
            return res.status(403).json({ error: '2FA required' });
        }

        const payload = {
            id: result.rows[0].id,
            firstname: result.rows[0].firstname,
            lastname: result.rows[0].lastname,
            email: result.rows[0].email,
            phone_number: result.rows[0].phone_number
        };
        jwt.sign(payload, 'secret', { expiresIn: 7200 }, (err, token) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ message: 'Login successful', token: `Bearer ${token}` });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sensitive Endpoint: Validate 2FA before making changes
app.put('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { token, username, firstname, lastname, phone_number, email, gender } = req.body;
    try {
        const userId = req.user.id;
        const validateResult = await pool.query('SELECT * FROM "2FA" WHERE user_id = $1 AND verified = true', [userId]);
        if (validateResult.rows.length === 0) {
            return res.status(403).json({ error: '2FA required for this operation' });
        }
        const valid = speakeasy.totp.verify({
            secret: validateResult.rows[0].secret,
            encoding: 'base32',
            token,
            window: 1
        });
        if (!valid) {
            return res.status(401).json({ error: 'Invalid 2FA token' });
        }
        const result = await pool.query(
            'UPDATE "USERS" SET username = $1, firstname = $2, lastname = $3, phone_number = $4, email = $5, gender = $6, updatedAt = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [username, firstname, lastname, phone_number, email, gender, userId]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
