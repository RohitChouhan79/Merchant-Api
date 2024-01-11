const express=require("express");
const { homepage,merchantsignup,merchantsignin,merchantsignout,merchantsession } = require("../controllers/indexController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router()

// Get / 
router.get("/",isAuthenticated, homepage)

// Get / 
router.post("/auth/signup",merchantsignup)

// post / 
router.post("/auth/login",merchantsignin)

// signout
router.post("/auth/logout",isAuthenticated,merchantsignout)

// session
router.get("/auth/session",isAuthenticated,merchantsession)

module.exports=router;