const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Route = "api/customers"

router.get('/', async (req, res) => {
    const genres = await Customer.find();
    res.send(genres);
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    customer.save();
    res.send(customer);
})

module.exports = router;