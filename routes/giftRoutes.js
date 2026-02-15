const Giftmodel = require('../models/Gifts')

const router=require('express').Router()
router.get('/',async(req,res,next)=>{
    try {
        const {page,pageSize}=req.query
        const skipDocuments=(page-1)*pageSize
        const data=await Giftmodel.find({}).skip(skipDocuments).limit(pageSize)
        const dataCount=await Giftmodel.countDocuments({})
        return res.status(200).json({data,count:dataCount})
    } catch (error) {
         next(error)
    }
})

router.get('/:id',async(req,res,next)=>{
    try {
        const {id}=req.params
        const data=await Giftmodel.findById(id)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})



module.exports=router