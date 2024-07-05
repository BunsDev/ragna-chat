import { TrialChatBotComponent } from "@/components/try/chat-bot"
import { siteConfig } from "@/config"
import { getTrialChatById, getTrialMessagesByChatId } from "@/data"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: `Trial Chat | ${siteConfig.name}`,
  description: "Trial Chat Page",
}

interface TrialChatBotPageProps {
  params: { chatId: string }
}
const TrialChatBotPage = async ({ params }: TrialChatBotPageProps) => {
  const { chatId } = params
  const chat = await getTrialChatById(chatId)
  const dbMessages = await getTrialMessagesByChatId(chatId)
  if (!chat) return redirect('/try')
  return (
    <div className="md:w-[80%] md:mx-auto">
      <TrialChatBotComponent chatId={chatId} isChatName={!!chat?.name} dbMessages={dbMessages!} />
    </div>
  )
}
export default TrialChatBotPage