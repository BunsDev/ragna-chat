import { Message } from "@/components/chat/chat-bot"
import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaRobot } from "react-icons/fa"

interface ChatBotMessagesProps {
    messages?: Message[]
    response?: string
}

export const ChatBotMessages = ({ messages, response }: ChatBotMessagesProps) => {
    const endMessageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (endMessageRef.current) {
            endMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if (messages?.length === 0 || !messages) {
        return (
            <div className="flex h-[calc(100vh-11rem)] flex-col justify-center items-center">
                <h1 className="font-bold text-3xl text-center text-foreground/50">Chat with ragna</h1>
                <p className="text-center font-semibold text-foreground/50">Ask me anything!</p>
            </div>
        )
    }
    return (
        <div className="flex h-[calc(100vh-11rem)] flex-col gap-3">
            {messages.map((message, index) => {
                if (message.role === "user") {
                    return (
                        <div key={index} className="flex justify-end">
                            <div className="p-2 border bg-foreground text-background rounded-lg max-w-[60%]">
                                {message.content}
                            </div>
                        </div>
                    )
                }
                if (message.role === "assistant") {
                    return (
                        <div key={index} className="flex w-full">
                            <Card>
                                <CardHeader><span className="flex gap-2 items-center">Ragna <FaRobot size={25} /></span></CardHeader>
                                <CardContent>{message.content}</CardContent>
                            </Card>
                        </div>
                    )
                }
            })}
            {response && (
                <div className="flex w-full">
                    <Card>
                        <CardHeader><span className="flex gap-2 items-center">Ragna <FaRobot size={25} /></span></CardHeader>
                        <CardContent>{response}</CardContent>
                    </Card>
                </div>
            )}
            <div ref={endMessageRef}></div>
        </div>
    )
}