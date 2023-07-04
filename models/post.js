const mongoose = require('mongoose')

const postscheama = new mongoose.Schema({
      postcontent: {
        "type": "string",
        "pattern": "^(?!.*(sex|Sex|SEX|porn|Porn|PORN|xxx|XXX)).{1,50}$",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
        "required": "false",
        "default": ""
      },
      picture: {
        "type": "string",
        "required": "false",
        "default": ""
      },
      postownerid: {
        "type": "string",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less."
      },
      postownername: {
        "type": "string",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less."
      },
      postownerpicture: {
        "type": "string",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less."
      },
      like: {
        "type": "Array",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
        "default": ""
      },
      comment: {
        "type": "Array",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
        "default": ""
      },
      postedtime: {
        "type": "String",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
      }
      

      
})

const postmodel = new mongoose.model('post', postscheama)
module.exports=postmodel