const express = require('express');
const createError = require('http-errors');

const loginAPI = express.Router()

loginAPI.post('/login', async (req, res, next) => {
    try {
        if (!req.body) {
            throw createError.BadRequest()
        }
        
        //handling login logic

        res.send('Login')
    } catch (error) {
        next(error)
    }
})

module.exports = loginAPI