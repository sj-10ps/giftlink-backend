const router=require('express').Router()
const Giftmodel=require('../models/Gifts')
router.get('/',async(req,res,next)=>{
    try {
        const {category,condition,name,year}=req.query
        let query={}
        if(category&&category!=="All"){
             query.category=new RegExp(category,'i')
        }
        if(condition&&condition!=="All"){
            query.condition=new RegExp(condition,'i')
        }
        if(year&&year>0){
            query.year={$gte:0,$lte:Number(year)}
        }
        if(name&&name.trim()!==""){
            query.$or=[
                {name:new RegExp(name,'i')},
                {description:new RegExp(name,'i')}
            ]
        }
       
        const gifts=await Giftmodel.find(query)
        return res.status(200).json(gifts)

    } catch (error) {
        next(error)
    }
})
module.exports=router