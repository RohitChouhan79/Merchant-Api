const { catchAsyncErrors } = require("../middleware/catchAsyncError");
const Merchants = require("../models/merchentModel");
const { paginateAndFilterMerchants, filterMerchants } = require("../utills/helperfunction");

// const Errorhandler = require("../utills/ErrorHandler");


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
    const merchant = await Merchants.findById(req.params.merchantid).exec();
    res.status(201).json({ sucess: true, merchant })
});



exports.pageinatefilter = catchAsyncErrors(async (req, res, next) => {
    const { page = 1, pageSize = 10, searchQuery = '', dateFrom = '', dateTo = '' } = req.query;
    const paginatedMerchants = paginateAndFilterMerchants(Merchants, page, pageSize, searchQuery, dateFrom, dateTo);
    res.json(paginatedMerchants);
});



exports.filtermerchant = catchAsyncErrors(async (req, res, next) => {
    try {
        const pdata = await Merchants.find();
        const filteredMerchants=pdata.filter((prd)=>{prd.merchantName.toLowerCase().includes(req.query.filterOptions.toLowerCase())})
        await res.json(filteredMerchants);
    } catch (error) {
        res.send(error)
    }
});
