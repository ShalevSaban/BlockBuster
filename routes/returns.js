const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { auth } = require('../middleware/auth');
const Joi = require('joi');

//const validate = (validator) => {
//
//    return (req, res, next) => {
//        const { error } = validator(req.body);
//        if (error) return res.status(400).send(error.details[0].message);
//        next();
//    }
//
//}
//
router.post('/', auth, async(req, res) => {

    const { error } = validateReturn(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);




    if (!rental) return res.status(404).send('rental not found');

    if (rental.dateReturned) return res.status(400).send();

    rental.return();
    await rental.save();


    await Movie.updateMany({ _id: rental.movie._id }, { $inc: { numberInStock: 1 } });




    res.status(200).send(rental);

});


function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });

    return schema.validate(req);
}

module.exports = router;