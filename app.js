require("dotenv").config({path:"./.env"})
const express=require("express");
const app=express();

// DB CONNECTION
require("./models/database").connectDatabase();
// logger
const logger=require("morgan");
app.use(logger("tiny"))

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// session

const session=require("express-session");
const cookieparser=require("cookie-parser")

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}));

// cookies

app.use(cookieparser());

// routes
app.use("/",require("./routes/indexRoutes"))

// error Handling
const Errorhandler=require("./utills/ErrorHandler");
const { generatedErrors } = require("./middleware/error");
app.all("*",(req,res,next)=>{
    next(new Errorhandler(`Requested URL not founds${req.url}`,404))
})
app.use(generatedErrors)

app.listen(
    process.env.PORT,console.log(`Server running on Port ${process.env.PORT}`)
)