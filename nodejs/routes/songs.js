const express = require('express');
const createError = require('http-errors');

const songs = express.Router()

songs.get('/', async (req, res, next) => {
    res.status(200).json({
        message: 'Get all songs',})
})

songs.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            throw createError.BadRequest()
        }
        const { id } = req.params;
        res.status(200).json({
            message: 'Get song by ID: ' + id,
        })
    } catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error)
    }
})

module.exports = songs;