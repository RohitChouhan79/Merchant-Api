exports.sendtokens=(merchant,statuscode,res)=>{
    const token=merchant.getjwttoken();
    // res.json({token});
    const option={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httpOnly:true,
        // secure:true,
    };
    res.status(statuscode).cookie("token",token,option).json({sucess:true,id:merchant._id,token});
}
