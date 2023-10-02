import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const SearchPage = async() => {
    //fetching user for id
    const user=await currentUser()
    if(!user)return null;
    
    //then getting all the info regarding that user 
    // by passing this id in function
    const userInfo=await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
     
    // const res=await fetchAllUsers({
    //     userId:user.id,
    //     searchString:'',
    //     pageNo:1,
    //     pageSize:25,
    // })
    // console.log(res.users)
  return (
   <section>
     <h1 className="head-text mb-10">Search</h1>
   </section>
  )
}

export default SearchPage