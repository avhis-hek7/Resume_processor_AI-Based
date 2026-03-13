const userModel = require('../models/user.model');

async function userRegisterController(req,res){

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Missing the user credentials!"
        })
    }
    const isUserExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ] // if one of the condition is satisfed then retun user{either thorugh email or username}
    });

    if(isUserExists){
        return res.status(400).json({
            message:"User is already exists with this email!"
        })
    }

    const user = await userModel.create({
        username,email,password
    })

    const token = await user.generateToken();

    res.cookie("token", token);

    return res.status(201).json({
        message:"User Register successfully.",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function userLoginController(req,res){

    const {email, password} = req.body;
    const isUserExists = await userModel.findOne({email:email})
    if(!isUserExists){
         return res.status(400).json({
            message:"Invalid login credentials!"
        })
    }

    const isValidPassword = await isUserExists.comparePassword(password);
    if(!isValidPassword){
        return res.status(400).json({
            message:"Inavalid login credentials!"
        })
    }

    const token = await isUserExists.generateToken();

    res.cookie("token", token);

    return res.status(200).json({
        message:"User login Successfully",
        isUserExists:{
            _id:isUserExists._id,
            username:isUserExists.username,
            email:isUserExists.email
        }
    })

  


}

module.exports = {userRegisterController, userLoginController};