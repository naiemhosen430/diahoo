const mongoose = require('mongoose')

const chatschema = new mongoose.Schema({
    chatIds: {
        "type": "array"
    },
    messages: {
        "type": "array"
    }
})

const chatmodel = new mongoose.model('chat', chatschema)
module.exports= chatmodel