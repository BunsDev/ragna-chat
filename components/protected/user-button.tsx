"use client"
import { Avatar,AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HelpCircle, Settings, User as UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DashboardIcon, ExitIcon } from "@radix-ui/react-icons"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { ExtendedUser } from "@/next-auth"

interface UserButtonProps {
    user?: ExtendedUser
}
export const UserButton = ({ user }: UserButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback><UserIcon size={25} /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.role === "ADMIN" && (<DropdownMenuItem asChild><Link href={"/dashboard"} className="flex gap-x-2" ><DashboardIcon height={24} width={24}/>Dashboard</Link></DropdownMenuItem>)}
                <DropdownMenuItem asChild><Link href={"/settings"} className="flex gap-x-2" ><Settings/>Settings</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={"/faq"} className="flex gap-x-2" ><HelpCircle/>Help</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Button className="w-full flex gap-x-2" onClick={()=>signOut()}>Signout <ExitIcon/></Button></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}