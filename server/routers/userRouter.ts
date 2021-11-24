// set up a router for user authentication
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel.ts');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get('/', async (req, res) => {
    res.send('login');
});

router.post('/', [
    expressValidator.check('email', 'Email is required').isEmail(),
    expressValidator.check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;