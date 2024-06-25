import { LoginPageFAQ } from "@/components/auth/login-page-faq"
import { AuthNavbar } from "@/components/auth/navbar"
import DotPattern from "@/components/magicui/dot-pattern"
import RetroGrid from "@/components/magicui/retro-grid"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface AuthLayoutProps {
    children: React.ReactNode
}
const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div>
    <div
    // style={{backgroundImage: "url('/assets/images/loginbg.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}
     className="p-5">
        <AuthNavbar/>
        {children}
      <DotPattern className={cn("z-[-100]","[mask-image:radial-gradient(500px_circle,white_0%,transparent_100%)]","dark:invert")}/>
    <Separator/>
    </div>
      <LoginPageFAQ/>
    </div>
  )
}
export default AuthLayout