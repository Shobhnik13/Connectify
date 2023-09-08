import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Topbar = () => {
  return (
    <nav className="topbar">
        <Link href={'/'}>
            <p className="text-heading3-bold max-xs:hidden text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300">Connectify</p>
        </Link>
    {/* main div for logout and org */}
        <div className="flex gap-1 items-center">
            {/* as we want the logout button in mobiles at topbar and in laps in leftsidebar  */}
            {/* div1 */}
            <div className="block md:hidden">
                {/* this signedin comp of clerk will only render the componet between it when ths user is signedin */}
                {/* we do not need to extract user from some api call now  */}
                {/* if we wrap a component x around signedin then x will only be renderd when user session is active  */}
                {/* no need to fecth user  */}
                <SignedIn>
                    <SignOutButton>
                        <div className="flex cursor-pointer ">
                            <Image src={'/assets/logout.svg'} alt="logout" width={24} height={24}/>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>

            {/* div2 */}
           <OrganizationSwitcher
           appearance={{
            elements:{
                organizationSwitcherTrigger:'py-2 px-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 text-lg font-semibold'
            }
           }}/>
        </div>
    </nav>
  )
}

export default Topbar