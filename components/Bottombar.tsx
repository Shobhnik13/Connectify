'use client'
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const Bottombar = () => {
  const pathname=usePathname()
  return (
    <section className="bottombar">
        <div className="bottombar_container">
        {sidebarLinks.map((item)=>{
          const isActive=(pathname === item.route) || (pathname.includes(item.route) && item.route.length>1)
          return(
          <Link href={item.route} key={item.label} className={`bottombar_link ${isActive && 'bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300'}`}>
            <Image src={item.imgURL} alt={item.label} width={24} height={24} />
            <p className='text-light-1 max-lg:hidden'>{item.label}</p>
          </Link>
           )
        })}
        </div>
    </section>
  )
}

export default Bottombar