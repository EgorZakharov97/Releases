const mongoose = require('mongoose')
const Release = require('../models/release-model')

const movieSchema = new mongoose.Schema({
    description: String,
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    duration: String,
    genre: String,
    authors: String
})

module.exports = Release.discriminator('Movie', movieSchema)