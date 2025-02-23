const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'user',
    password: '6',
    port: 5432,
});

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { username, firstname, lastname, phone_number, email, gender, password } = req.body;
    try {
        const userAlreadyExist = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
        if (userAlreadyExist.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const result = await pool.query(
            'INSERT INTO "USERS" (username, firstname, lastname, phone_number, email, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [username, firstname, lastname, phone_number, email, gender, password]
        );
        return res.status(201).json({message: "User created successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (result.rows[0].password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({message: "Login successful"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, firstname, lastname, phone_number, email, gender, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE "USERS" SET username = $1, firstname = $2, lastname = $3, phone_number = $4, email = $5, gender = $6, password = $7, updatedAt = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
            [username, firstname, lastname, phone_number, email, gender, password, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM "USERS" WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

