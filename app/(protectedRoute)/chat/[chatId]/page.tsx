import { ChatBotComponent } from "@/components/chat/chat-bot"
import { getChatById, getMessagesByChatId } from "@/data"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

interface ChatPageProps {
    params: {chatId:string}
}
const ChatPage = async ({params}: ChatPageProps) => {
    const user = await currentUser()
    const {chatId} = params
    const chat = await getChatById(chatId)
    const dbMessages = await getMessagesByChatId(chatId)
    if (!chat || user?.id !== chat.userId) return redirect("/")
    return (
        <div>
            <ChatBotComponent chatId={chatId} dbMessages={dbMessages!} />
        </div>
    )
}
export default ChatPage