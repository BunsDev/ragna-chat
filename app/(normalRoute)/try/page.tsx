import { TryPageComponent } from "@/components/try/tryPage"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

const TryPage = async () => {
  const newTrialChat = await db.trialChat.create({data:{}})
  if (newTrialChat) return redirect(`/try/chat/${newTrialChat.id}`)
  return (
    <div className="h-screen flex items-center justify-center">
        <TryPageComponent/>
    </div>
  )
}
export default TryPage