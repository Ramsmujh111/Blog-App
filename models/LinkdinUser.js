const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const LinkedinUser     = new Schema({
    UserName:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
        default:null,
    },
    accessToken:{
        type:String,
    },
})

module.exports = mongoose.model('Linkedine' , LinkedinUser);