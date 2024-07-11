import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Metadata } from "next"
import { siteConfig } from "@/config"

export const metadata: Metadata = {
  title: `Auth Error | ${siteConfig.name}`,
  description: "Auth Error Page",
}

// export const runtime = 'edge'

const AuthErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <CardWrapper headerLabel="Something went wrong!">
        <Button className="w-full" asChild><Link href={"/auth/login"}>Go back to login!</Link></Button>
      </CardWrapper>
    </div>
  )
}
export default AuthErrorPage