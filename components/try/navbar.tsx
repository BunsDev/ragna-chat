import { Logo } from "@/components/logo"
import { Button } from "../ui/button"
import Link from "next/link"

export const TryNavbar = () => {
  return (
    <header>
        <div className="flex">
            <div className="mx-auto">
            <Logo/>
            </div>
            <Button asChild><Link href={"/auth/login"}>Login</Link></Button>
        </div>
    </header>
  )
}