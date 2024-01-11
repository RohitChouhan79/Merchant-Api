const { catchAsyncErrors } = require("../middleware/catchAsyncErrors")
const USER = require("../models/userModel")
const Errorhandler = require("../utills/ErrorHandler")
const { sendtokens } = require("../utills/sendToken")


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Homepage" })
})

exports.merchantsignup = catchAsyncErrors(async (req, res, next) => {
    const user = await new USER(req.body).save();
    // req.status(201).json(merchant);
    sendtokens(user, 201, res)
})

exports.merchantsignin = catchAsyncErrors(async (req, res, next) => {
    const user = await USER.findOne({ email: req.body.email })
        .select("+password")
        .exec();

    if (!user) return next(new Errorhandler("User not found by this email address", 404))

    const isMatch = user.comparepassword(req.body.password)

    if (!isMatch) return next(new Errorhandler("Wrong Password", 402))
    sendtokens(user, 200, res)
})


exports.merchantsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Succesfully signout" })

})


exports.merchantsession = catchAsyncErrors(async (req, res, next) => {
    res.json({
        authenticated: true,
        merchant: req.merchant,
        // permissions: req.merchant.permissions
    })

}) 