"use client"
import { User } from "next-auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { newChat } from "@/actions/new-chat"
import { useToast } from "@/components/ui/use-toast"
import { Toast } from "../ui/toast"
import { Chat } from "@prisma/client"
import { BarLoader } from "react-spinners"
import { useTransition } from "react"

interface NewChatButtonProps {
    user: User
    setChatsState: (callback: (prevChats: Chat[]) => Chat[]) => void;
}

export const NewChatButton = ({ user, setChatsState }: NewChatButtonProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            newChat(user.id!)
                .then((data) => {
                    if (data.success) {
                        setChatsState((prevChats: Chat[]) => {
                            const updatedChats = [...prevChats, data.chat]
                            return updatedChats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                          })
                        router.push(`/chat/${data.chat.id}`)
                    }
                    if (data.error) {
                        toast({ title: data.error })
                    }
                })
        })

    }
    return (
        <Button onClick={handleClick}>{!isPending ? "New Chat" : (<BarLoader/>)}</Button>
    )
}