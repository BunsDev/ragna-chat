import { ChatBotComponent } from "@/components/chat/chat-bot"
import { getChatById, getMessagesByChatId } from "@/data"
import { redirect } from "next/navigation"

interface ChatPageProps {
    params: {chatId:string}
}
const ChatPage = async ({params}: ChatPageProps) => {
    const {chatId} = params
    const chat = await getChatById(chatId)
    const dbMessages = await getMessagesByChatId(chatId)
    if (!chat) return redirect("/")
    return (
        <div>
            <ChatBotComponent chatId={chatId} dbMessages={dbMessages!} />
        </div>
    )
}
export default ChatPage