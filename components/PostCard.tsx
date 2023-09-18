import Image from "next/image"
import Link from "next/link"

interface Props{
    id:string,
    currentUserId:string,
    parentId:string | null,
    content:string,
    author:{
        name:string,
        image:string,
        id:string,
    },
    community:{
        name:string,
        image:string,
        id:string,  
    } | null,
    createdAt:string,
    comments:{
        author:{
         image:string,
        }
    }[]
    isComment?:boolean
}

const PostCard = ({id,currentUserId,parentId,content,author,community,createdAt,comments,isComment}:Props) => {
  return (
      <article className="flex flex-col w-full bg-dark-2 p-7 rounded-xl">
       {/* article -> its a html tag used for cards  */}
        {/* main div wrapper div -> article   */}
        <div className="flex items-start justify-between">
            {/* div for all info  */}
            <div className="flex flex-1 w-full flex-row gap-4">
            {/* div for image div and name div */}
                {/* div1 for image  */}
                <div className="flex flex-col items-center">
                    <Link href={`/profile/${author.id}`} className="relative w-11 h-11">
                        <Image alt="user" className="cursor-pointer rounded-full" fill src={author.image}/>
                    </Link>
                        {/* for line  */}
                <div className="thread-card_bar"></div>
                </div>

                {/* div 2 for name , content , icons and comments*/}
                <div className="flex w-full flex-col">
                    {/* name  */}
                    <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                    </Link>
                    {/* content  */}
                    <p className="mt-2 text-small-regular text-light-2">{content}</p>
                    {/* icon div and comment div  */}
                    <div className="flex flex-col mt-5 gap-3">
                        {/* icon div  */}
                        <div className="flex gap-3.5">
                            <Image src={"/assets/heart-gray.svg"} alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Link href={`/post/${id}`}>
                            <Image src={"/assets/reply.svg"} alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
                            </Link>
                            <Image src={"/assets/repost.svg"} alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Image src={"/assets/share.svg"} alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
                        </div>
                        {/* comments div start  */}
                    </div>

                </div>

            </div>
        </div>
        
   </article>
  )
}

export default PostCard