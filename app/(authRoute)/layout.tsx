import { AuthNavbar } from "@/components/auth/navbar"

interface AuthLayoutProps {
    children: React.ReactNode
}
const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div className="p-5">
        <AuthNavbar/>
        {children}
    </div>
  )
}
export default AuthLayout