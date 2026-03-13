const mongoose = require('mongoose');

     

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        unique:[true, "User name already taken!"],
        required:true
    },
    email:{
        type:String,
        unique:[true, "Account alraedy exists with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }




},{timestamps:true})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;