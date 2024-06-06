import { ProtectedNavbar } from "@/components/protected/navbar"
import { currentUser } from "@/lib/auth"

interface ProtectedLayoutProps {
    children: React.ReactNode
}
const ProtectedLayout = async ({ children }:ProtectedLayoutProps) => {
    const user = await currentUser()
    return (
        <div className="py-5">
            <ProtectedNavbar user={user} />
            {children}
        </div>
    )
}
export default ProtectedLayout