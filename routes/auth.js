const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

router.use(express.json());




router.post('/', async(req, res) => {


    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email ');

    bcrypt.compare(req.body.password, user.password);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid  password');

    const token = user.generateAuthToken();
    res.send(token);






});



function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

module.exports = router;