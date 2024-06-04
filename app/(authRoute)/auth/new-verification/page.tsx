import { CardWrapper } from "@/components/auth/card-wrapper"
import { NewVerification } from "@/components/auth/new-verification"
import { Suspense } from "react"

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