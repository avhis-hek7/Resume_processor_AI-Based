
const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blackList.model');

async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing!"
        })
    }

    const isTokenBlackListed = await tokenBlackListModel.findOne({token})

    if(isTokenBlackListed){
        return res.status(401).json({
            message:"Token invalid! "
        })
    }



    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        return next()


    } catch (err) {
        return res.status(401).json({
            message:"Unauthorized access, invalid user!"
        })
        
    }

}

module.exports = {authUserMiddleware}