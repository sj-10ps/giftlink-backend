const commentModel = require('../models/Comments')
const Giftmodel = require('../models/Gifts')
const userModel = require('../models/User')
const CommentLimiter = require('../utils/CommentLimter')

const router=require('express').Router()
router.get('/profile',async(req,res,next)=>{
    try {
        const {id}=req.user
        const data=await userModel.findById(id)
        res.status(200).json({message:"success",data:data})
    } catch (error) {
        next(error)
    }
})


router.post('/updateprofile',async(req,res,next)=>{
    try {
        const {firstName,lastName}=req.body
        const {id}=req.user
        const data=await userModel.findByIdAndUpdate(id,{firstName,lastName},{new:true,runValidators:true})
        res.status(200).json({message:"successfully update",data:data})
    } catch (error) {
         next(error)
    }
})



router.get('/comments/:id',async (req,res,next) => {
    try {

        const {id}=req.params
     
        const data=await commentModel.find({gift:id}).populate("user","firstName LastName")

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/comments',CommentLimiter,async(req,res,next)=>{
    try {
        const {comment,id}=req.body
        const {id:userId}=req.user
        
        await commentModel.create({
            comment:comment,
            gift:id,
            user:userId
        })
        res.status(200).json({message:"succesfully uploaded"})
    } catch (error) {
         console.log(error)
         next(error)
    }
})
module.exports=router