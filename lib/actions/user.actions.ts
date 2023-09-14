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



export async function updateUser({name,username,path,image,bio,userId}:props):Promise<void> {
    //connectuing to db
    connectionToDb()

    try{
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

export async function fetchUser(userId:string){
    try{
        connectionToDb()
    }catch(error:any){

    }
}