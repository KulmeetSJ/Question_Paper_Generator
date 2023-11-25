const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
//const validateQuestionInput = require('../validation/generate');
// Load User model
const User = require("../models/User");

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            console.log(req.body.email);
            console.log("Email already exists")
            return res.status(400).json({ success: false, email: "Email already exists" });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json({ success: true, message: "User registered successfully" }))
                        .catch(err => { console.log(err); return res.json({ success: false, message: "User registration failed" }) });
                });
            });
        }
    });
});


router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ success: false, email: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            }
            else {
                return res.status(400).json({ success: false, password: "Password incorrect" });
            }
        }).catch(err => { console.log(err); return res.json({ success: false, message: "User registration failed" }) });
    });
});



module.exports = router;