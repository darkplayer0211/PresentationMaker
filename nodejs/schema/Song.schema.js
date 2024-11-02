const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Song', SongSchema)