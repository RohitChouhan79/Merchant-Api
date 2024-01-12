const express=require("express");
const { homepage,merchantsignup,merchantsignin,merchantsignout,merchantsession, } = require("../controllers/indexController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router()

// Get / 
router.get("/",isAuthenticated, homepage)

// Get /auth/signup
router.post("/auth/signup",merchantsignup)

// post /auth/login
router.post("/auth/login",merchantsignin)

//post /auth/logout
router.post("/auth/logout",isAuthenticated,merchantsignout)

//post /auth/session
router.get("/auth/session",isAuthenticated,merchantsession)



module.exports=router;