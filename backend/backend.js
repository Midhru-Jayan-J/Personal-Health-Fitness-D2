const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./keys/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const app = express();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
const jwt = require('jsonwebtoken');
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const transpoter = nodemailer.createTransport({
    service:'gmail.com',
    auth:{
        user:"makapersonalfitness@gmail.com",
        pass:"maka@1234"
    }
});

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { username, firstname, lastname, phone_number, email, gender, password } = req.body;
    try {
        const userAlreadyExist = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
        if (userAlreadyExist.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const result = await pool.query(
            'INSERT INTO "USERS" (username, firstname, lastname, phone_number, email, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [username, firstname, lastname, phone_number, email, gender, hashedPassword]
        );
        return res.status(201).json({message: "User created successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM "USERS" WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        isMatch = await bcrypt.compare(password, result.rows[0].password);
        if (!isMatch) {
            
            return res.status(401).json({ error: 'Invalid password' });
        }
        const payload = {id: result.rows[0].id, 
            firstname: result.rows[0].firstname, 
            lastname: result.rows[0].lastname,
            email: result.rows[0].email,
            phone_number: result.rows[0].phone_number};
        jwt.sign(payload, "secret", {expiresIn: 7200}, (err, token) => {
            if (err) {
                throw err;
            }
            res.status(200).json({message: "Login successful", token: `Bearer ${token}`});
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/profile', passport.authenticate('jwt',{session:false}), async (req, res) => {
    pool.query('SELECT * FROM "USERS" WHERE id = $1', [req.user.id])
    .then(user => {
        res.status(200).json({
            id: user.rows[0].id,
            username: user.rows[0].username,
            firstname: user.rows[0].firstname,
            lastname: user.rows[0].lastname,
            phone_number: user.rows[0].phone_number,
            email: user.rows[0].email
        });
    }).catch(err => res.status(500).json({error: err.message}));
});



app.put('/user', passport.authenticate('jwt',{session:false}), async (req, res) => {
    var { username, firstname, lastname, phone_number, email, password, oldPassword } = req.body;
    try {
        const user = await pool.query('SELECT * FROM "USERS" WHERE id = $1', [req.user.id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User unmatched' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        var changes = 0;
        if (username !== "" && username !== user.rows[0].username) {
            changes++;
        }else{
            username = user.rows[0].username;
        }

        if (firstname !== "" && firstname !== user.rows[0].firstname) {
            changes++;
        }else{
            firstname = user.rows[0].firstname;
        }

        if ( lastname !== "" && lastname !== user.rows[0].lastname) {
            changes++;
        }else{
            lastname = user.rows[0].lastname;
        }

        if (phone_number !== "" && phone_number !== user.rows[0].phone_number) {
            changes++;
        }else{
            phone_number = user.rows[0].phone_number;
        }
        
        if (email !== "" && email !== user.rows[0].email) {
            changes++;
        }else{
            email = user.rows[0].email;
        }
            
        if (changes > 0) {
        const result = await pool.query(
            'UPDATE "USERS" SET username = $1, firstname = $2, lastname = $3, phone_number = $4, email = $5, updatedAt = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [username, firstname, lastname, phone_number, email, req.user.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(result.rows[0]);
    }else{
        return res.status(200).json({message: "No changes made"});
    }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/sendmail', passport.authenticate("jwt",{session:false}),async (req,res)=>{

    const { content } = req.body;
    const email = await pool.query('SELECT email FROM "USERS" WHERE id = $1', [req.user.id]);
    if (email.rows.length === 0) {
        return res.status(400).json({ error: "Email is required" });
    }
    const mailOptions = {
        from: 'makapersonalfitness@gmail.com',
        to: req.user.email,
        subject: "Protein Update!!!",
        text: content
    };

    transpoter.sendMail(mailOptions,(error, info)=>{
        if (error){
            return res.status(500).json({error:error.message});
        }
        res.json({message:"Email sent"});
    });

});


app.delete('/deregister', passport.authenticate("jwt",{session:false}), async (req, res) => {
    const email = req.user.email;
    try {
        const result = await pool.query('DELETE FROM "USERS" WHERE email = $1 RETURNING *', [email]);
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