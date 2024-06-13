"use client"
import { deleteChat } from "@/actions/delete-chat"
import { Chat } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ChatButton } from "./chat-button"
import { updateChatName } from "@/actions/update-chat-name"
import { useAtom } from "jotai"
import { chatsStateAtom } from "@/utils/store"

interface HomeChatListProps{
    chats: Chat[]
}
const HomeChatList = ({chats}:HomeChatListProps) => {
    const [isPending, startTransition] = useTransition()
    const [chatsState, setChatsState] = useAtom(chatsStateAtom)
    const router = useRouter()
    const { toast } = useToast()
    
    useEffect(() => {
        if(chats) setChatsState(chats)
    }, [])
    
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

    const handleNameChange = (chatId: string, name: string) => {
        startTransition(() => {
            updateChatName(chatId, name)
                .then((data) => {
                    if (data.success) {
                        toast({
                            title: data.success
                        })
                        const newChats = chatsState.map((chat) => {
                            if (chat.id === chatId) {
                                chat.name = name
                            }
                            return chat
                        })
                        setChatsState(newChats)
                        router.refresh()
                    }
                    if (data.error) {
                        toast({
                            title: data.error
                        })
                    }
                })
        })
    }

  return (
    <>
    {chatsState.map((chat,index) => (
        <ChatButton handleNameChange={handleNameChange} key={index} chat={chat} handleDelete={handleDelete} isPending={isPending} />
    ))}
    </>
  )
}
export default HomeChatList