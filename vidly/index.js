const mongoose = require('mongoose');
const express = require('express');
const app =  express();
const genres = require('./routes/genres');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongodb...'))
    .catch(error => console.error('Could not connect to mongodb...'));

app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
    res.send("Welcome to Vidly");
})

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
