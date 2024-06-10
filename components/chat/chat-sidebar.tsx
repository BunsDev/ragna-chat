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
import { updateChatName } from "@/actions/update-chat-name"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
        <Sheet>
            <SheetTrigger asChild><Button variant={"outline"}><HamburgerMenuIcon /></Button></SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle><Logo /></SheetTitle>
                    <NewChatButton setChatsState={setChatsState} user={user!} />
                </SheetHeader>
                {!chats && <SheetDescription>No chats</SheetDescription>}
                {chatsState && (
                    <ScrollArea className="h-[calc(100vh-10rem)] my-5">
                        <div>
                        {chatsState.map((chat, index) => (
                                <ChatButton key={index} isPending={isPending} chat={chat} handleNameChange={handleNameChange} handleDelete={handleDelete} />
                        ))}
                        </div>
                    </ScrollArea>
                )}
            </SheetContent>
        </Sheet>
    )
}