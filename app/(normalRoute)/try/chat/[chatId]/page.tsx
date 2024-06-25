import { TrialChatBotComponent } from "@/components/try/chat-bot"
import { getTrialChatById, getTrialMessagesByChatId } from "@/data"
import { redirect } from "next/navigation"

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