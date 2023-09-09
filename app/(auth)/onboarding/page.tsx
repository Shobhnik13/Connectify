import AccountProfile from "@/components/AccountProfile"
import { currentUser } from "@clerk/nextjs"


const OnboardingPage = async() => {
    // current user will give a user object in this server component 
    const user=await currentUser()
    //database
    const userInfo={}
    const userData={
        id:user?.id,
        objectId:userInfo?._id,
        username:userInfo?.username || user?.username,
        name:userInfo?.name || user?.firstName || "",
        bio:userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }
  return (
    <main className="flex mx-auto flex-col max-w-3xl justify-start px-10 py-20">
        <h1 className="head-text">Onboarding</h1>
        <p className="mt-3 text-base-regular text-light-2">Complete the process to join Connectify!</p>

        <section className="mt-9 bg-dark-2 p-10"> 
            <AccountProfile user={userData} btnTitlt='Continue'/>
        </section>
    </main>
  )
}

export default OnboardingPage