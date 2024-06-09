import { Chat } from "@prisma/client"
import { User } from "next-auth"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Logo } from "@/components/logo"
import { NewChatButton } from "@/components/chat/new-chat-btn"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatButton } from "@/components/chat/chat-button"
import { deleteChat } from "@/actions/delete-chat"
import { startTransition, useState, useTransition } from "react"
import { useToast } from "../ui/use-toast"
import { usePathname, useRouter } from "next/navigation"

interface ChatSideBarProps {
    user?: User
    chats?: Chat[]
}

export const ChatSideBar = ({ user, chats }: ChatSideBarProps) => {
    const { toast } = useToast()
    const [isPending, setIsPending] = useTransition()
    const [chatsState, setChatsState] = useState<Chat[]>(chats || [])
    const pathname = usePathname()
    const router = useRouter()
    const handleDelete = (chatId: string) => {
        const isCurrentChat = pathname === `/chat/${chatId}`
        if (isCurrentChat) {
            toast({
                title: "You cannot delete the chat you are currently in",
            })
            return
        }
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
        const newChats = chatsState.map((chat) => {
            if (chat.id === chatId) {
                chat.name = name
            }
            return chat
        })
        setChatsState(newChats)
    }
    return (
        <Sheet>
            <SheetTrigger><Button variant={"outline"}><HamburgerMenuIcon /></Button></SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle><Logo /></SheetTitle>
                    <NewChatButton setChatsState={setChatsState} user={user!} />
                </SheetHeader>
                {!chats && <SheetDescription>No chats</SheetDescription>}
                <ScrollArea className="h-[calc(100vh-10rem)] my-10">
                    <div className="flex flex-col gap-2">
                        {chatsState && chatsState.map((chat, index) => (
                            <ChatButton isPending={isPending} key={index} chat={chat} handleDelete={handleDelete} />
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}