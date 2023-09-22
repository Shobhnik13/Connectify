import PostCard from "@/components/PostCard"
import { fetchPostById } from "@/lib/actions/post.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const page = async({params}:{params:{id:string}}) => {
    //if no id then return null
    if(!params.id)return null
    //user
    const user=await currentUser()
    if(!user)return null;
    const userInfo=await fetchUser(user.id) 
    if(!userInfo.onboarded) redirect('/onboarding')
    const item=await fetchPostById(params.id)
  return ( 
    <section className="relative">
        <div>
        <PostCard
          key={item._id}
          id={item._id}
          currentUserId={user?.id || ""}
          parentId={item.parentId}
          content={item.text}
          author={item.author}
          community={item.community}
          createdAt={item.createdAt}
          comments={item.children}
          />
        </div>
    </section>
  )
}

export default page