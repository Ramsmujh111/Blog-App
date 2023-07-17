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
        default:null,
    },
    imageUrl:{
        type:String,
        default:null,
    },
    accessToken:{
        type:String,
    },
    googleId:{
        type:String,
    }
})

module.exports = mongoose.model('User' , User);