import { ChatBotComponent } from "@/components/chat/chat-bot"
import { siteConfig } from "@/config"
import { getChatById, getMessagesByChatId } from "@/data"
import { currentUser } from "@/lib/auth"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: `Chat | ${siteConfig.name}`,
    description: "Chat Page",
}

export const runtime = 'edge'

interface ChatPageProps {
    params: { chatId: string }
}
const ChatPage = async ({ params }: ChatPageProps) => {
    const user = await currentUser()
    const { chatId } = params
    const chat = await getChatById(chatId)
    const dbMessages = await getMessagesByChatId(chatId)
    if (!chat || user?.id !== chat.userId) return redirect("/")
    return (
        <div className="md:w-[80%] md:mx-auto">
            <ChatBotComponent chatId={chatId} isChatName={!!chat?.name} dbMessages={dbMessages!} />
        </div>
    )
}
export default ChatPage