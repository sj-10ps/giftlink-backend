const limiter=require('express-rate-limit')
const loginLimiter=limiter({
    windowMs:15*60*1000,
    max:5,
    handler:(req,res)=>{
        res.status(429).json({message:"too many requests try again later"})
    }
})

module.exports=loginLimiter