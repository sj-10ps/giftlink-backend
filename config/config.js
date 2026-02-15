const dotenv=require('dotenv')
const { default: mongoose } = require('mongoose')
dotenv.config()

const connectToDatabase=async()=>{
  try {

    const MONGO_URL=process.env.MONGO_URL
    if(!MONGO_URL){
        throw new Error("url not found")
    }
    await mongoose.connect(MONGO_URL)
   

  } catch (error) {
     console.log(error.message)
  }
}
module.exports=connectToDatabase