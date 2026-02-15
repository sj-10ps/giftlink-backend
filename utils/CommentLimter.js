const limiter=require('express-rate-limit')
const CommentLimiter=limiter({
    windowMs:15*60*1000,
    max:5,
    handler:(req,res)=>{
        res.status(429).json({message:"too many attempts please try again later"})
    }

})

module.exports=CommentLimiter