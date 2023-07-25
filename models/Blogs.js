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
    like:{
        type:Number,
        default:0
    },
    comment:[String],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Blogs' , Blogs);