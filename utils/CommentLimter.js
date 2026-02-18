const limiter=require('express-rate-limit')
const {createClient} = require('redis');
const {RedisStore} = require('rate-limit-redis');
const redisClient=createClient({
    url:process.env.REDIS_URL
})
redisClient.connect().catch(console.error)

redisClient.on('connect',()=>{
    console.log('Connected to redis')
})

const CommentLimiter=limiter({
    store:new RedisStore({
         sendCommand:(...args)=>redisClient.sendCommand(args)   
    }),
    windowMs:15*60*1000,
    max:20,
    standardHeaders:true,
    handler:(req,res)=>{
        res.status(429).json({message:"too many attempts please try again later"})
    }

})

module.exports=CommentLimiter