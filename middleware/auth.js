const jwt=require("jsonwebtoken");
const Errorhandler = require("../utills/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

// Created is authenticate function

exports.isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(
            new Errorhandler("Please login in to access the resource",401)    
        );
    }
    const {id}=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.id=id;
    // res.json({id,token})
    next()
})