//Basic import
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./src/routes/api');

//Security middleware import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');



//Rate Limit use
const limiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 15,
    massage: 'Too many requests from this ip. Please try again latter'
});


//Security middleware implement
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);


//bodyParser implement
app.use(bodyParser.json());


//route
app.use('/api/v1', router)



module.exports = app;