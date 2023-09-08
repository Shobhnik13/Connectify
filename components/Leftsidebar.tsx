'use client'
import {sidebarLinks} from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter,usePathname } from 'next/navigation'
 
const Leftsidebar = () => {
  const pathname=usePathname()
  const router=useRouter()
  return (
    // contains 2 div up for links and down for logout 
    <section className="custom-scrollbar leftsidebar">
          {/* div 1 for links  */}
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((item)=>{
          const isActive=(pathname === item.route) || (pathname.includes(item.route) && item.route.length>1)
          return(
          <Link href={item.route} key={item.label} className={`leftsidebar_link ${isActive && 'bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300'}`}>
            <Image src={item.imgURL} alt={item.label} width={24} height={24} />
            <p className='text-light-1 max-lg:hidden'>{item.label}</p>
          </Link>
           )
        })}
        </div>
    </section>
  )
}

export default Leftsidebar