import { Logo } from "@/components/logo"
import Link from "next/link"
import { UserButton } from "@/components/protected/user-button"
import { User } from "next-auth"

interface ProtectedNavbarProps {
  user?: User
}
export const ProtectedNavbar = ({user}:ProtectedNavbarProps) => {
  return (
    <header className="sm:px-5 sm:space-between flex items-center select-none">
        <span className="md:mx-auto"><Link href={"/"}><Logo/></Link></span>
        <UserButton user={user}/>
    </header>
  )
}