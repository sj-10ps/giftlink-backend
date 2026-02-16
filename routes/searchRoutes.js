const router=require('express').Router()
const Giftmodel=require('../models/Gifts')
router.get('/',async(req,res,next)=>{
    try {
        const {category,condition,name,year}=req.query
        let query={}
        const numYear=Number(year)
        if(category&&category!=="All"){
             query.category=new RegExp(category,'i')
        }
        if(condition&&condition!=="All"){
            query.condition=new RegExp(condition,'i')
        }
        if(numYear&&numYear>0){
            query.age_years={$gte:0,$lte:year}
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