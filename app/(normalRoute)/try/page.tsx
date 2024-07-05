import { TryPageComponent } from "@/components/try/tryPage"
import { siteConfig } from "@/config"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: `Generate Trial Chat | ${siteConfig.name}`,
  description: "Generate Trial Chat Page",
}

const TryPage = async () => {
  const newTrialChat = await db.trialChat.create({data:{}})
  if (newTrialChat) return redirect(`/try/chat/${newTrialChat.id}`)
  return (
    <div className="flex items-center justify-center">
        <TryPageComponent/>
    </div>
  )
}
export default TryPage