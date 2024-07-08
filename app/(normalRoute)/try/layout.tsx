import { TryNavbar } from "@/components/try/navbar"
import { currentUser } from "@/lib/auth"


interface tryLayoutProps {
  children: React.ReactNode
}
const TryLayout = async ({ children }: tryLayoutProps) => {
  const user = await currentUser()
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-[2] bg-background">
        <div className="py-3 px-8">
          <TryNavbar />
        </div>
      </div>
      <div className="mx-5">
        {children}
      </div>
    </div>
  )
}
export default TryLayout