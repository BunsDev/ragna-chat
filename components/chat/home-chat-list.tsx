"use client"
import { deleteChat } from "@/actions/delete-chat"
import { Chat } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ChatButton } from "./chat-button"

interface HomeChatListProps{
    chats: Chat[]
}
const HomeChatList = ({chats}:HomeChatListProps) => {
    const [isPending, startTransition] = useTransition()
    const [chatsState, setChatsState] = useState<Chat[]>(chats || [])
    const router = useRouter()
    const { toast } = useToast()
    const handleDelete = (chatId: string) => {
        startTransition(() => {
            deleteChat(chatId)
                .then((data) => {
                    if (data.success) {
                        const newChats = chatsState.filter((chat) => chat.id !== chatId)
                        setChatsState(newChats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
                        toast({
                            title: data.success,
                        })
                        router.refresh()
                    }
                    if (data.error) {
                        toast({
                            title: data.error,
                        })
                    }
                })
        })
    }
  return (
    <>
    {chatsState.map((chat,index) => (
        <ChatButton key={index} chat={chat} handleDelete={handleDelete} isPending={isPending} />
    ))}
    </>
  )
}
export default HomeChatList