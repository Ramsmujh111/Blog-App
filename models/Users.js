const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const User     = new Schema({
    UserName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    imageUrl:{
        type:String,
        default:false,
    },
})

module.exports = mongoose.model('User' , User);