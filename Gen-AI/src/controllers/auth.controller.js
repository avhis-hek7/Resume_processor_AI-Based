const userModel = require('../models/user.model');
const tokenBlacklistModel = require('../models/blackList.model');

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

async function  userLogoutController(req,res){
    const token = req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({token});
    }
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })

}

async function getMeController(req, res) {
  try {
     
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    console.log(req.user)
    const user = await userModel.findById(req.user.userId).select('-password');
    console.log(user)



    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User details fetch successfully.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = {userRegisterController, userLoginController, userLogoutController, getMeController};