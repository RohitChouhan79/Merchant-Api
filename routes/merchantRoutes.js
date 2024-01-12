const express=require("express");
const { pageinatefilter,addmerchants,editmerchants,deletemerchants,Detailmerchants,filtermerchant} = require("../controllers/merchantController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router()


// get /api/merchants
router.get('/merchants',filtermerchant);

// post api/merchants
router.post("/merchants",isAuthenticated, addmerchants)
//post /api/merchants/:merchantid
router.post("/merchants/:merchantid",isAuthenticated, editmerchants)
//post  /api/merchants/Delete/:merchantid
router.post("/merchants/Delete/:merchantid",isAuthenticated, deletemerchants)
// get /api/merchants/:merchantid
router.get("/merchants/:merchantid",isAuthenticated,Detailmerchants)

// get /api/merchants/filter

router.get('/merchants/filter', pageinatefilter);

module.exports=router