const express=require("express");
const { pageinatefilter,addmerchants,editmerchants,deletemerchants,Detailmerchants,filtermerchant} = require("../controllers/merchantController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router()

router.post("/merchants",isAuthenticated, addmerchants)
router.post("/merchants/:merchantid",isAuthenticated, editmerchants)
router.post("/merchants/Delete/:merchantid",isAuthenticated, deletemerchants)
router.get("/merchants/:merchantid",isAuthenticated,Detailmerchants)

// router.get('/api/merchants/filter',filtermerchant);


router.get('/merchants', pageinatefilter);

module.exports=router