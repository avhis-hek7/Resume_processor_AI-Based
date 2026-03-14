const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

     

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

userSchema.pre("save", async function(){
    if(!this.isModified('password')){
        return
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    return
        
})

userSchema.methods.generateToken = async function(){
    return jwt.sign({userId:this._id, userName:this.username}, process.env.JWT_SECRET, { expiresIn:"3d" })
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;