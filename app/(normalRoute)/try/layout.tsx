import { TryNavbar } from "@/components/try/navbar"


interface tryLayoutProps {
    children: React.ReactNode
}
const TryLayout = ({children}:tryLayoutProps) => {
  return (
    <div className="p-5">
        <TryNavbar/>
        {children}
    </div>
  )
}
export default TryLayout