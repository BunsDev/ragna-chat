import { NewVerification } from "@/components/auth/new-verification"
import { siteConfig } from "@/config"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: `New Verification | ${siteConfig.name}`,
  description: "New Verification Page",
}

const NewVerificationPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense>
        <NewVerification />
      </Suspense>
    </div>
  )
}
export default NewVerificationPage