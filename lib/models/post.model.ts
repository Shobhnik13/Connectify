import mongoose from 'mongoose'
const postSchema=new mongoose.Schema({
    text:{
        type:String,
        require:true,
    },
    //this means a post can have only a single author which is of an objectId type 
    //and it is a ref of User
    //thats why in db the post is created to the specified user only
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    community:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    //this is used when a user comments on someone else post
    //assume this post is a comment on some else post 
    //so we would find a parent here 
    //parent is the one who owns this post 
     
    parentId:{
        type:String,
    },
    //this means that a Post can have multiple Post(ref->Post) as stored in children array 
    //simply means recursion
    // ->post(this is parent of p1 and p2)
        // ->post1 
        // ->post2(parent of p3)
           // ->post3 
        //so p1 and p2 are in this children array as a mongoose.schema.types.objectid type and a post ref
    children:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post',
        }
    ]
})
const Post=mongoose.models.Post || mongoose.model('Post',postSchema)

export default Post