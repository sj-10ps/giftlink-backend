
const multer=require('multer')
const upload=multer()
const router=require('express').Router()
const bcrypt=require('bcrypt')
const Usermodel=require('../models/User')
const jwt=require('jsonwebtoken')
const loginLimiter = require('../utils/loginRatelimit')
router.post('/register',upload.none(),async(req,res,next)=>{
    console.log("kjewbfhfbwfgwuifggu")
    const {firstname,lastname,email,password}=req.body
    try {
        const existing=await Usermodel.findOne({email:email})
        if(existing){
            res.status(409).json({message:"User already exists...please login"})
            
        }
        const encpassword=await bcrypt.hash(password,10)
        const NewUser=new Usermodel({
            firstName:firstname,
            lastName:lastname,
            email:email,
            password:encpassword
        })
        await NewUser.save()
        res.status(200).json({message:"succesfully registered"})
        
    } catch (error) {
        next(error)
    }
   
})

router.post('/login',loginLimiter,async(req,res,next)=>{
    const {email,password}=req.body

    try {
        const existing=await Usermodel.findOne({email})
        if(!existing){
            res.status(401).json({message:'User doesnt exist'})
        }
        const passmatching=await bcrypt.compare(password,existing.password)
        if(!passmatching){
           res.status(404).json({message:'wrong password'})
        }
        const token=jwt.sign({id:existing._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.status(200).json({message:"success",data:existing,token:token})
    } catch (error) {
        next(error)
    }
})
module.exports=router