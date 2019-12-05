const mongoose = require('mongoose')

const releaseSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
        enum: ['Movie', 'Game']
    },
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {}
})

module.exports = mongoose.model('Release', releaseSchema)