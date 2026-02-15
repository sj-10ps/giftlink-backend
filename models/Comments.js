const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
        required:true
    },
    gift:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Gift'
    }
})

const commentModel=mongoose.models.Comment||mongoose.model("Comment",commentSchema)
module.exports=commentModel