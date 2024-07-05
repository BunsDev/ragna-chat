import { TryNavbar } from "@/components/try/navbar"


interface tryLayoutProps {
  children: React.ReactNode
}
const TryLayout = ({ children }: tryLayoutProps) => {
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