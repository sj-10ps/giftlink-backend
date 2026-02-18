const limiter=require('express-rate-limit')
const {createClient} = require('redis');
const {RedisStore} = require('rate-limit-redis');
const redisClient=createClient({
    url: 'redis://sjps:sJ@123456@redis-13725.c85.us-east-1-2.ec2.cloud.redislabs.com:13725'
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