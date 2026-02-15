const express=require('express')
const connectToDatabase = require('./config/config')
const pinoHttp=require('pino-http')
const logger = require('./logger')
const cors=require('cors')

connectToDatabase().then(()=>logger.info("Db connected")).catch(err=>console.log(err))

const app=express()
// app.use(pinoHttp({logger}))
app.use(express.json())
app.use(cors())

const giftroutes=require('./routes/giftRoutes')
const searchRoutes=require('./routes/searchRoutes')
const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/authRoutes')
const requireAuth = require('./utils/requireAuth')
app.use('/gift',giftroutes)
app.use('/search',searchRoutes)
app.use('/',userRoutes)
app.use('/auth',requireAuth)
app.use('/auth',authRoutes)
app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(500).json({error:err.message})
})

app.get('/',(req,res)=>{
    return res.send('welcome')
})

const port=process.env.PORT||4000
app.listen(port,"0.0.0.0",()=>{
    console.log(`Server running on port ${port}`);
})