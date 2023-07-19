const mongoose = require('mongoose')

const resshema = new mongoose.Schema(
  {
        fullname: {
          "type": "string",
          "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
          "default": ""
        },
        coverphoto: {
          "type": "array",
          "default": ""
        },
        profilephoto: {
          "type": "array",
          "default": ""
        },
        tittle: {
          "type": "string",
          "minLength": 0,
          "maxLength": 300,
          "default": ""
        },
        age: {
          "type": "number",
          "default": ""
        },
        gender: {
          "type": "number",
          "default": ""
        },
        hometwon: {
          "type": "string",
          "minLength": 0,
          "maxLength": 50,
          "default": ""
        },
        friendrequests: {
          "type": "Array",
          "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
          "default": ""
        },
        friends: {
          "type": "Array",
          "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
          "default": ""
        },
        homecity: {
          "type": "string",
          "minLength": 0,
          "maxLength": 50,
          "default": ""
        },
        birthday: {
          "type": "string",
          "minLength": 0,
          "maxLength": 50,
          "default": ""
        },
        online_status: {
          "type": "number",
          "default": ""
        },
        email: {
          "type": "string",
          "default": ""
        },
        password: {
          "type": "string",
          "minLength": 0,
          "maxLength": 100,
          "default": ""
        },
        verificationCode: {
          "type": "Number"
        },
        note: {
          "type": "Array"
        }
  },
  {
    timestamps: true
  }
)

const resmodel = new mongoose.model('user', resshema)
module.exports=resmodel