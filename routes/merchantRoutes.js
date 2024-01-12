const express=require("express");
const { pageinatefilter,addmerchants,editmerchants,deletemerchants,Detailmerchants,filtermerchant} = require("../controllers/merchantController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router()



// get /api/merchants/filter

router.get('/merchants', pageinatefilter);

// get /api/merchants
router.get('/merchants/filter',filtermerchant);

// post api/merchants
router.post("/merchants",isAuthenticated, addmerchants)
//post /api/merchants/:merchantid
router.post("/merchants/:merchantid",isAuthenticated, editmerchants)
//post  /api/merchants/Delete/:merchantid
router.post("/merchants/Delete/:merchantid",isAuthenticated, deletemerchants)
// get /api/merchants/:merchantid
router.get("/merchants/:merchantid",isAuthenticated,Detailmerchants)




module.exports=router