"use client"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { UserButton } from "@/components/protected/user-button"
import { usePathname } from "next/navigation"
import { ChatSideBar } from "@/components/chat/chat-sidebar"
import { Chat } from "@prisma/client"
import { User } from "next-auth"

interface ProtectedNavbarProps {
  user?: User
  chats?: Chat[]
}
export const ProtectedNavbar = ({ user,chats }: ProtectedNavbarProps) => {
  const pathname = usePathname()
  const isChatPath = pathname.startsWith("/chat/")
  return (
    <header className={`justify-between ${isChatPath ? "" : "md:justify-normal"} flex items-center select-none`}>
      {isChatPath && (
        <ChatSideBar user={user} chats={chats}/>
      )}
      <span className="md:mx-auto"><Link href={"/"}><Logo /></Link></span>
      <UserButton user={user} />
    </header>
  )
}