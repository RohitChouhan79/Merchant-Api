const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userModel=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,"Email  is Required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,"Password shhould not exceed more then 15 characters"],
        minLength:[6,"Password shhould have atleast  then 6 characters"],
        required:[true,"password  is Required"],

        // match: 
    },
    permissions:["read","write"],
    merchants:[{type:mongoose.Schema.Types.ObjectId,ref:"merchants"}],

},{timestamps:true})

userModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt=bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password,salt)
})

userModel.methods.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

userModel.methods.getjwttoken=function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
    }; 
const USER=mongoose.model("user",userModel)

module.exports=USER