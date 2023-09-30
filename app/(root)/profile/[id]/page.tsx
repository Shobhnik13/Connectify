import ProfileHeader from "@/components/ProfileHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async({params}:{params:{id:string}}) => {
  //grabbing the user
  const user =await currentUser()
  if(!user) return null;
  //now fetching the user by the currrent auth user
  const userInfo=await fetchUser(params.id)
  if(!userInfo?.onboarded) redirect('/onboarding')

  return (
  <section>
    {/* profile header  */}

    <ProfileHeader
    accountId={userInfo.id}
    authUserId={user.id}
    // this auth user id will help us to identify that the user is looking to his/her own profile
    // or someone else profile
    // coz if authuserid===accountid so it is lookin at his/her own profile
    name={userInfo.name}
    username={userInfo.username}
    imageUrl={userInfo.image}
    bio={userInfo.bio}
    />

    {/* tab for switching  */}
    <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((item)=>(
                <TabsTrigger value={item.value} key={item.label} className="tab">
                  <Image src={item.icon} className="object-contain" alt={item.label} width={24} height={24}/>
                  <p className="max-sm:hidden">{item.label}</p>
                  {/* showing no of post only in postlist(value=posts and labe=Posts)  */}
                  {item.label === 'Posts' && (
                      <p className="ml-1  rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2 ">{userInfo?.posts?.length}</p>
                  )}
                </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
    </div>
  </section>
  )
}

export default page