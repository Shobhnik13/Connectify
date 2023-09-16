import PostThread from "@/components/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const CreatePost =async() => {
    const user=await currentUser()
    if(!user)return null;
    const userInfo=await fetchUser(user.id)
    //!userinfo?.onboarded  -> means usrinfo.onboarded===false then  redirect to onboarding
    if(!userInfo?.onboarded) redirect('/onboarding')
    return (
    <>
    <h1 className="head-text">Create post</h1>
    <PostThread userId={userInfo._id}/>
    </>
  )
}

export default CreatePost