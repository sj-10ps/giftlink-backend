const mongoose=require('mongoose')
const giftSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    condition:{
        type:String
    },
    posted_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    zipcode:{
        type:Number,
    },
    date_added:{
        type:Date,
        default:()=>new Date()
    },
    age_years:{
        type:Number,
    },
    age_days:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

const Giftmodel=mongoose.models.Gift||mongoose.model("Gift",giftSchema)
module.exports=Giftmodel