const { catchAsyncErrors } = require("../middleware/catchAsyncErrors")
const Merchant = require("../models/merchantModel")
const Errorhandler = require("../utills/ErrorHandler")
const { sendtokens } = require("../utills/sendToken")


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Homepage" })
})

exports.merchantsignup = catchAsyncErrors(async (req, res, next) => {
    const merchant = await new Merchant(req.body).save();
    // req.status(201).json(merchant);
    sendtokens(merchant, 201, res)
})

exports.merchantsignin = catchAsyncErrors(async (req, res, next) => {
    const merchant = await Merchant.findOne({ email: req.body.email })
        .select("+password")
        .exec();

    if (!merchant) return next(new Errorhandler("User not found by this email address", 404))

    const isMatch = merchant.comparepassword(req.body.password)

    if (!isMatch) return next(new Errorhandler("Wrong Password", 402))
    sendtokens(merchant, 200, res)
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