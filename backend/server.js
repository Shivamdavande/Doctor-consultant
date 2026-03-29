const express = require('express');
const mongoose = require('mongoose');
const helmate = require('helmet');
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const response = require('./middleware/response');
require('dotenv').config();


const app = express();

//helmat is a security middleware for express apps
//it helps to secure the app by setting various HTTP headers
app.use(helmate());


//morgan is a logging middleware for express apps
app.use(morgan('dev'));


app.use(cors({
    origin: (process.env.ALLOWER_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean) || '*',
    credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(response);

connectDB();

app.get('/health', (req, res) => res.ok({time: new Date().toISOString()},'OK'))


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});