const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Blogs    = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    FileDestination:{
        type:String,
    },
},{
    timestamps:true
})

module.exports = mongoose.model('Blogs' , Blogs);