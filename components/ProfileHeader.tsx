'use client'

import Image from "next/image"

interface Props{
    accountId:string,
    authUserId:string,
    name:string,
    username:string,
    imageUrl:string,
    bio:string
}
const ProfileHeader = ({accountId,authUserId,name,username,imageUrl,bio}:Props) => {
  return (
    <div className="flex flex-col justify-start w-full">
        {/* image and username,name */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative w-20 h-20">
                    <Image src={imageUrl} alt="Profile img" fill className="rounded-full object-cover shadow-2xl"/>
                </div>
                <div className="flex-1">
                    <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                    <p className="text-base-medium text-gray-1  ">@{username}</p>
                </div>
            </div>
        </div>
        {/* bio  */}
        <p className="mt-6 text-base-regular text-light-2 max-w-lg">{bio}</p>
        {/* that line  */}
        <div className="mt-12 h-0.5 w-full bg-dark-3"/>
    </div>
  )
}

export default ProfileHeader