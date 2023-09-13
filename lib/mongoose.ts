import mongoose from 'mongoose'

let isConnected=false
export const connectionToDb=async()=>{
    mongoose.set('strictQuery',true)

    if(!process.env.MONGODB_URI) return console.log('URI Not found!')
    if(isConnected) return console.log('already connected!')

    try{
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected=true
        console.log('connected!')
    }catch(error){
        console.log(error)
    }
}