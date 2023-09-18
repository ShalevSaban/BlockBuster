const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

const express = require("express");
//const Fawn = require("fawn");
const mongoose = require('mongoose');
const router = express.Router();

router.use(express.json());

//Fawn.init(mongoose);
//Fawn.init("mongodb://127.0.0.1:27017/rentals");
//router.use(express.urlencoded({ extended: true }));



router.get('/', async(req, res) => {

    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);

});

//Getting a single genre

router.post('/', async(req, res) => {


    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    if (movie.numberInStock == 0) return res.status(400).send('movie not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    //try {
    //    new Fawn.Task()
    //        .save('rentals', rental)
    //        .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //        .run();
    //
    //    res.send(rental);
    //
    //} catch (ex) {
    //    res.status(500).send('something failed');
    //}

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);




});

router.get('/:id', async(req, res) => {

    const rental = await Rental.findById(req.params.id)

    if (!rental)
        return res.status(404).send('The rental not found');

    res.send(rental);
});



router.delete('/:id', async(req, res) => {

    const rental = await Rental.findByIdAndRemove(req.params.id)

    if (!rental)
        return res.status(404).send('The rental not found');


    res.send(rental);
});


module.exports = router;