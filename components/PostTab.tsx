import { fetchUserPost } from "@/lib/actions/post.actions"
import { redirect } from "next/navigation"
import PostCard from "./PostCard"



interface Props{
    currentUserId:string,
    accountId:string,
    accountType:string,
}
const PostTab = async({currentUserId,accountId,accountType}:Props) => {
    const res=await fetchUserPost(accountId)
    // this posts will contain an array of posts which is coming from fetchuserpost
    //so we need to map res.posts
    if(!res)redirect('/')
  
  return (
    <section className="mt-9 flex flex-col gap-10">
     {
        res.posts.map((item:any)=>(
        <PostCard
          key={item._id}
          id={item._id}
          currentUserId={currentUserId}
          parentId={item.parentId}
          content={item.text}
          author={accountType === 'USER'
          ?{name: res.name, image:res.image, id: res.id}
          :{name:item.author.name,image:item.author.image,id:item.author.id}
        }
          community={item.community}
          createdAt={item.createdAt}
          comments={item.children}/>
          ))}
    </section>
  )
}

export default PostTab