'use server'
// this 'use server' will allow us to run a specific code to server only 

import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectionToDb } from "../mongoose"

interface props{
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}


//update user function used in profile page
export async function updateUser({name,username,path,image,bio,userId}:props):Promise<void> {
    //connectuing to db
    connectionToDb()

    try{
        //finding user by userId 
        //then updating the parameters that coming from props which is coming from AccountForm page
        await User.findOneAndUpdate(
        {
            id:userId
        },
        // we wil find the user by id first(id:userId)
        //thwn we upadte the user in followring properties
        //update the username(coming from params) ,name,bio,image,onboarded 
        { 
            username:username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true,
        },
        // upsert:true means if there is any row already existing of this id(userid) then it will get updated
        //if there does NOT exist any row of this id:userId then it will create a new row automatically
        //thats why its called upsert(update if found or insert if not ->up(update if found)sert(insert if not))
        {upsert:true}
        )
        // if the path is /profile/edit then next js will revalidate the data associated with that path
        if(path === '/profile/edit'){
            revalidatePath(path)
        }
    }catch(error:any){
        throw new Error(`Failed to Update/Create user: ${error.message}`)
    }
}


//fetch user used in crete post
export async function fetchUser(userId:string){
    connectionToDb()
    try{
        // finding user by using user id
        // as findOne will help to retrive only a single document that belongs to the passed criteria
        //id:userId
         return await User
         .findOne({id:userId})
        // populate('communities') tells Mongoose to replace the communities field in the User model 
        // with the actual ref (that is defined in User model communities section) ie->'Community' document from the Community collection.  
        // .populate({
        //     path:'communities',
        //     model:Community,    
        // })

    }catch(error:any){
        throw new Error(`Failed to fetch user!:${error.message}`)
    }
}