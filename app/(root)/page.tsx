
import PostCard from '@/components/PostCard'
import { fetchPosts } from '@/lib/actions/post.actions'
import { UserButton, currentUser, useAuth } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const user=await currentUser()
  const res=await fetchPosts(1,30);
  // console.log(res)
  return (
    <>
    <h1 className='head-text text-left'>Home</h1>
    <section className='mt-9 flex flex-col gap-10'>
      {res.posts.length === 0?(
        <p className='no-result'>Oops! No posts found</p>
      ):(
        <>
        {res.posts.map((item)=>(
          <PostCard
          key={item._id}
          id={item._id}
          currentUserId={user?.id || ""}
          parentId={item.parentId}
          content={item.text}
          author={item.author}
          community={item.community}
          createdAt={item.createdAt}
          comments={item.children}/>
        ))}
        </>
      )}
    </section>
    </>
  )
}
