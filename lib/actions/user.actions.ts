'use server'
// this 'use server' will allow us to run a specific code to server only 

import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectionToDb } from "../mongoose"
import { SortOrder } from "mongoose"
import { FilterQuery } from "mongoose"

interface props{
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}


//update user function used in AccountProfile component of onboarding page
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


//fetch user used in create post so that we can pass this user to a comp in create post page 
//which will be further used to update the post array of this user

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


// fetch all users that will be used in search page 
export async function fetchAllUsers({
    userId,
    pageNo=1,
    pageSize=20,
    searchString = "",
    sortBy="desc",
}:{
   userId?:string,
   pageNo?:number,
   pageSize?:number,
   searchString?:string,
   sortBy?:SortOrder, 
}){
    connectionToDb()
    try{
        //skip amount same as when we were fetching the posts on home page
        //so we would be implementing same pagination loic here too
        //for users on search page
        const skipCount=(pageNo-1)*pageSize

        //creating a regEx to convert the coming searchString as a case in-sesitive
        //so when if ex-> my id is abcd@123
        //but user searches AbcD@123 so this would directly
        //be converted to abcd@123 by using regex
        //regex=new RegExp(searchString,'i')
        //the above syntax means that searchString would be converted
        // to regular expression which is case in sensitive (i.e i)
        //regex=new RegExp(searchString,'i')
        const regex=new RegExp(searchString,'i')
        //query means
        //find a query/user
        // in which id is not equal(ne) to the userId
        // thats why { id:{ $ne:userId } }
        const query: FilterQuery<typeof User>={
            id:{$ne:userId}
        }
        //now check that if the searchString do exist or not
        //searchstring.trim()!=='' means search string is not exmpty
        if(searchString.trim()!==''){
            query.$or=[
                { username:{$regex:regex} },
                { name :{$regex:regex} }
            ]
        }
        const sortOptions={createdAt:sortBy}
        const usersQuery=User.find(query)
        .sort(sortOptions)
        .limit(pageSize)
        .skip(skipCount)

        const totalUserCount=await User.countDocuments(query)
        //time to execute the userQuery
        const users=await usersQuery.exec() 
        const isNext=totalUserCount > skipCount + users.length
        return {isNext,users}
    }catch(error:any){
        throw new Error(`Error fetching users : ${error.message}`)
    }
}