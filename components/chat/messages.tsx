import { Message } from "@/components/chat/chat-bot"
import { useEffect, useRef } from "react"
import { BotMessage } from '@/components/chat/bot-message'
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

interface ChatBotMessagesProps {
    chatId:string
    messages?: Message[]
    response?: string
    refreshLatest:()=>void
}

const inter = Inter({
    subsets: ["latin"],
})

export const ChatBotMessages = ({ chatId,messages, response,refreshLatest }: ChatBotMessagesProps) => {
    const endMessageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (endMessageRef.current) {
            endMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if (messages?.length === 0 || !messages) {
        return (
            <div className="flex h-[calc(100vh-11rem)] flex-col justify-center items-center select-none">
                <h1 className="font-bold text-3xl text-center text-foreground/50">Chat with ragna</h1>
                <p className="text-center font-semibold text-foreground/50">Ask me anything!</p>
            </div>
        )
    }
    return (
        <div className="flex w-full h-[calc(100vh-11rem-1px)] flex-col gap-3">
            {messages.map((message, index) => {
                if (message.role === "user") {
                    return (
                        <div key={index} className="flex justify-end">
                            <div className="p-2 max-w-[85%] md:max-w-[60%] border bg-foreground text-background rounded-lg">
                                <pre className={cn(inter.className, "overflow-x-auto whitespace-pre")}>
                                    {message.content}
                                </pre>
                            </div>
                        </div>
                    )
                }
                if (message.role === "assistant") {
                    return (
                        <div key={index} className="w-full">
                            <BotMessage>{message.content}</BotMessage>
                        </div>
                    )
                }
            })}
            {response && (
                <div className="w-full">
                    <div className="w-full">
                        <BotMessage live>{response}</BotMessage>
                    </div>
                </div>
            )}
            {messages[messages.length - 1].role === "assistant" && (
                <div className="ml-auto">
                    <Button onClick={()=>refreshLatest()} variant={"ghost"}>
                        <RefreshCcw size={20} />
                    </Button>
                </div>
            )}
            <div ref={endMessageRef}>
                {/* Empty div to scroll to */}
            </div>
        </div>
    )
}