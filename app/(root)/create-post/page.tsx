import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"

const CreatePost =async() => {
    const user =await currentUser()
    if(!user)return null;
    const userInfo=await fetchUser(user.id)
  return (
    <div className="head-text">
        Create Post
    </div>
  )
}

export default CreatePost