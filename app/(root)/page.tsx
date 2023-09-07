
import { UserButton, useAuth } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  
  return (
   <div className='flex justify-between bg-red-400 p-5'>
    <p>tmkc</p>
    {/* <div><UserButton afterSignOutUrl='/sign-in'/></div> */}
   </div>
  )
}
