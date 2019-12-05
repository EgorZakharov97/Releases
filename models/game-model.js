const mongoose = require('mongoose')
const Release = require('../models/release-model')

const gameSchema = new mongoose.Schema({
    description: String,
    image: {
        type: String,
        required: true
    },
    platform: String,
    'number of players': String,
    developer: String,
    publisher: String,
    genre: String,
    'industry rating': String
})

module.exports = Release.discriminator('Game', gameSchema)