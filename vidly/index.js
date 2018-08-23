const express = require('express');
const app =  express();

app.use(express.json());

const generes = [
    {id: 1, name: "Comedy"},
    {id: 2, name: "Action"},
    {id: 3, name: "Drama"},
    {id: 4, name: "Sports"},
    {id: 5, name: "Horror"},
]

app.get('/', (req, res) => {
    res.send("Welcome to Vidly");
})

app.get('/api', (req, res) => {
    res.send("This the Vidly API");
})

app.get('/api/genres', (req, res) => {
    res.send(generes);
})














// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
