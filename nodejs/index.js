require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const loginAPI = require('./routes/auth.js');
const songs = require('./routes/songs.js');
const cors = require('cors');

const PORT = 8000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, ()  => {
    console.log("Server running on port:", PORT);
})

app.get('/', async (req, res) => {
    res.send('Home')
})

app.use('/auth', loginAPI);
app.use('/songs', songs);

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
})