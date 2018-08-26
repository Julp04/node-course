const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // undefined
console.log(`app: ${app.get('env')}`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration

console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

app.get('/', (req, res) => {
    res.send('Hello world');
})

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
app.use(logger);


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})