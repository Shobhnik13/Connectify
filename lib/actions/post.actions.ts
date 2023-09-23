'use server'
// if we not use this 'use server' then we will get an error coz we can NOT directly create databases or apis
//in the browser which is also called as CORS
//to prevernt CORS we use this 
import { revalidatePath } from "next/cache"
import Post from "../models/post.model"
import User from "../models/user.model"
import { connectionToDb } from "../mongoose"

    interface params{
        text:string,
        author:string,
        communityId:string | null,
        path:string,
}

interface params2{
    
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

//fetch posts
export async function fetchPosts(pageNumber=1,pageSize=20){
    connectionToDb()
    try{
        //calculate the no of posts to skip
        // as the 1st page would be skipping no posts
        //so pageNumber-1=1-1=0 
        // and skipcount would be 0
        //results in showing all posts
        //and for the 2nd page 2-1=1*20=20
        // there would be 20 posts to skip for 2nd page
        //coz those 20 posts were shown at 1st page
        const skipCount=(pageNumber-1)*pageSize


        //fetch the post that have no parents
        //only a single post
        //top level post
        //coz post with parent are comments
        //sorting it in desc order so that newest comees at top
        const postQuery=Post.find({parentId:{$in: [null,undefined]}})
        .sort({createdAt:"desc"})
        .skip(skipCount)
        .limit(pageSize)
        .populate({path:'author',model:'User'})
        .populate({path:'children',
            populate:{
                path:'author',
                model:'User',
                select:'_id name parentId image'
            }})


            //total posts without parents
            //same way as calculating postquery
            //this will be used in pagination
            const totalPosts=await Post.countDocuments({parentId:{$in:[null,undefined]}})
            //executing the postQuery
            const posts=await postQuery.exec()
            //now checking that next page exists or not
            //if the total post count would be > skipcount + post that are executed
            //ex- we have 45 posts in totalPosts
            //20 are executed on page-1 and those 20 are skipped
            //so total>20
            //means we are having more post than the posts that would be skipped + posts that are executed 
            const isNext=totalPosts > skipCount + posts.length
            //if isnext exist return a obj of isnext and the posts that needs to be executed in the next page
            return {isNext,posts}
    }catch(error:any){
        throw new Error(`error fetching post:${error.message}`)
    }

}

//ftech post by id
export async function fetchPostById(id:string){
    connectionToDb()
    try{
        const postQuery = await Post.findById(id)
        .populate({
            path:'author',
            model:'User',
            select:'_id name image id'
        })
        .populate({
            path:'children',
            populate:[
                {
                    path:'author',
                    model:'User',
                    select:'_id name image id parentId'
                },
                {
                    path:'children',
                    model:'Post',
                    populate:{
                        path:'author',
                        model:'User',
                        select:'_id id name image parentId'
                    }
                }
            ]
        }).exec()            
        return postQuery
    }catch(error:any){
        throw new Error(`Error fetching post: ${error.message}`)
    }
}

// add comments to post
export async function addCommentToPost(
    postId:string,
    commentText:string,
    userId:string,
    path:string,
){
    connectionToDb()
    try{
        //first fetch the post by postId
        //coz we will be commenting under this post
        const post=await Post.findById(postId)
        //if post doesnt exist return the error
        if(!post){
            throw new Error('Post not found!')
        }
        //now if post does exist
        //then create a new post with comment text
        const commentPost=new Post({
            text:commentText,
            author:userId,
            parentId:postId
        })

    //saving it
        const savedPost=await commentPost.save()

        //now after creating the comment post
        //we need to update the post under which we will be posting this comment
        // i.e the post we fetched in the beginning 
        //so pushing this comment post in original post (post) in children array
        post.children.push(savedPost._id)
        //now saving the original thread(post)
        await post.save()
        //revalidating path to make immediate changes to the path 
        revalidatePath(path)
    }catch(error:any){
        throw new Error(`Failed to post comment :${error.message}`)
    }
}