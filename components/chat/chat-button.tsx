"use client"
import { Chat } from "@prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { TrashIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation"
import { ArrowBigRight, LinkIcon } from "lucide-react"
import { Form } from "../ui/form"

interface ChatButtonProps {
    chat: Chat
    handleDelete: (chatId: string) => void
    isPending: boolean
}
export const ChatButton = ({ chat, handleDelete, isPending }: ChatButtonProps) => {
    const pathname = usePathname()
    const isCurrentChat = pathname === `/chat/${chat.id}`
    return (
        <div className="flex items-center">
            <Button className="w-fit" variant={`${isCurrentChat ? "default" : "link"}`} asChild>
                <Link href={`/chat/${chat.id}`}>
                    {chat.name || `untitled ${new Date(chat.updatedAt).toDateString()}`}
                </Link>
            </Button>
            {!isCurrentChat && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost"><TrashIcon /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                chat from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={isPending} onClick={() => handleDelete(chat.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}