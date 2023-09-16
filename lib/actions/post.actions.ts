'use server'
import { revalidatePath } from "next/cache"
// if we noy use this 'use server' then we will get an error coz we can NOT directly create databases or apis
//in the browser which is also called as CORS
//to prevernt CORS we use this 
import Post from "../models/post.model"
import User from "../models/user.model"
import { connectionToDb } from "../mongoose"

    interface params{
        text:string,
        author:string,
        communityId:string | null,
        path:string,
}
// create post in postThread
export async function createPost({text,author,communityId,path}:params){
    connectionToDb()
    try{
        const newPost=await Post.create({
            text,
            author,
            //if the member is of any community then the post would be of communityId
            //othewrise or default its null
            community:null,
        })
        if(newPost){
            //now after creation of post we need to update user
            //finding by id means author
            //then the posts array    
            await User.findByIdAndUpdate(author,{
                // pushing the newPost id in posts array of user
                    $push:{posts:newPost._id}
                })
        }
        //to make sure the changes happens immediately on the provided path
        revalidatePath(path)
    }catch(error:any){
        throw new Error(`Error creating post:${error.message}`)
    }


}