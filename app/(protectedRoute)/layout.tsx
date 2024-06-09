import { ProtectedNavbar } from "@/components/protected/navbar"
import { getAllChatsByUserId } from "@/data"
import { currentUser } from "@/lib/auth"

interface ProtectedLayoutProps {
    children: React.ReactNode
}
const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const user = await currentUser()
    const chats = await getAllChatsByUserId(user?.id!)
    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-[2] bg-background">
                <div className="py-3 px-5">
                    <ProtectedNavbar user={user} chats={chats}/>
                </div>
            </div>
            <div className="mx-5">
            {children}
            </div>
        </div>
    )
}
export default ProtectedLayout