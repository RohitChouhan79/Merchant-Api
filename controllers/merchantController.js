const { catchAsyncErrors } = require("../middleware/catchAsyncError");
const Merchants = require("../models/merchentModel");
const USER = require("../models/userModel");
// const USER = require("../models/userModel");


exports.pageinatefilter = catchAsyncErrors(async (req, res, next) => {
    let fromdate = '01 01 2024';
    let todate = Date.now();
    let page = 1
    let pageSize = 10
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    if (req.query.to) {
        fromdate = req.query.to
    }
    if (req.query.from) {
        todate = req.query.from
    }
    const MerchantstData = await Merchants.find();
    const fillteredMerchent = MerchantstData.filter((e) => {
        if (e.merchantName.toLowerCase().includes(req.query.merchantName) && e.createdAt >= todate && e.createdAt >= fromdate) {
            return e;
        }
    })
    const pageinatefilter = fillteredMerchent.slice(startIndex, endIndex)

    res.json({ merchants: pageinatefilter, currentpage: parseInt(page), currentpageSize: parseInt(pageSize), totalSize: fillteredMerchent.length() });
});


exports.addmerchants = catchAsyncErrors(async (req, res, next) => {
    const merchants = await new Merchants(req.body).save()
    // merchants.push({...req.body,id:uuidv4()})

    res.json({ merchants });

})

exports.editmerchants = catchAsyncErrors(async (req, res, next) => {
    await Merchants.findByIdAndUpdate(req.params.merchantid, req.body);
    res.status(200).json({
        sucess: true,
        message: " update Suceesfully",
        Merchants
    })
});

exports.deletemerchants = catchAsyncErrors(async (req, res, next) => {
    await Merchants.findByIdAndDelete(req.params.merchantid);
    res.status(200).json({
        sucess: true,
        message: " Delete Suceesfully",
        Merchants
    })
});

exports.Detailmerchants = catchAsyncErrors(async (req, res, next) => {
    const user = await USER.findById(req.id).exec();
    const merchant = await Merchants.findById(req.params.merchantid).exec();
    user.merchants.push(merchant._id);
    merchant.user.push(user._id);
    await user.save()
    await merchant.save()
    res.status(201).json({ sucess: true, merchant })
});


exports.filtermerchant = catchAsyncErrors(async (req, res, next) => {
    try {
        const MerchantstData = await Merchants.find();
        const fillteredMerchent = MerchantstData.filter((e) => {
            if (e.merchantName.toLowerCase().includes(req.query.merchantName) && e.createdAt >= todate && e.createdAt >= fromdate) {
                return e;
            }
        })
        await res.json(fillteredMerchent);
    } catch (error) {
        res.send(error)
    }
});


