const mongoose = require('mongoose')

const likeschema = new mongoose.Schema({
    postid: {
        "type": "string"
    },
    likeduserid: {
        "type": "string"
    },
    likedusername: {
        "type": "string"
    },
    likeduserphoto: {
        "type": "string"
    }
})

const likedmodel = new mongoose.model('like', likeschema)
module.exports= likedmodel