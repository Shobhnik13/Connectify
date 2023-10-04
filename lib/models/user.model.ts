import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{type:String},
    bio:{type:String},
    //this means a user(model) can have multiple post(Post->model {type:,ref}) as posts
    posts:[
        //array whose elements are ids
        //just like array of integers
        //this is array of object ids of Post
        //Posts:[id1,id2,id3,......]
        
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    onboarded:{
        type:Boolean,
    },
    //communities will be an array of obj coz a user can have multiple communities
    communities:[
        {
            //this means that a user can have multiple communities on th same user id/objectid
            //so thats why type is mongoose.schema.types.objectid
            type:mongoose.Schema.Types.ObjectId,
            ref:'Community'
        }
    ]
})
// as when we call User model first time we will not be having any User model so it will fallback to another condition and will create a model named User created using userSchema
//so when we call it second time the mongoose.models.User will be existing already so will never fall back to 2nd condition and creating a new User model created by using userSchema

const User=mongoose.models.User || mongoose.model('User',userSchema)

export default User;