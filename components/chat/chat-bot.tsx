"use client"
import { ChatBotSchema } from "@/schemas"
import { ChatBotForm } from "./form"
import * as z from "zod"
import { User } from "next-auth"
import { useMemo, useRef, useState, useTransition } from "react"
import { ChatBotMessages } from "@/components/chat/messages"

interface ChatBotComponentProps {
    user?: User
}

export interface Message {
    role: "user" | "assistant" | "system"
    content: string
    name?: string | null | undefined
}

export const ChatBotComponent = ({ user }: ChatBotComponentProps) => {

    const [messages, setMessages] = useState<Message[]>([])
    const memoizedMessages = useMemo(() => messages, [messages])
    const [updatingText, setUpdatingText] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const responseRef = useRef<string>("")
    const [isPending, startTransition] = useTransition()


    const fetchStream = async (newMessages: Message[]) => {
        responseRef.current = ""
        setIsFetching(true);
        // console.log({newMessages})
        try {
            const response = await fetch('/api/chat/response', { // Replace '/api/your-endpoint' with your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newMessages }) // Replace with your actual prompt
            })
            const reader = response.body!.getReader()
            const decoder = new TextDecoder('utf-8')

            while (true) {
                const { value, done } = await reader.read()
                if (done) {
                    break
                }
                const chunk = decoder.decode(value, { stream: true });
                setUpdatingText((prevText) => prevText + chunk)
                responseRef.current = responseRef.current + chunk
            }

            setIsFetching(false)
            setUpdatingText("")
            // console.log({ message: responseRef.current, messages: messages })
            setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: responseRef.current }])
        } catch (e) {
            console.error("Error fetching response:", e);
            setIsFetching(false);
        }
    }


    const onSubmit = (values: z.infer<typeof ChatBotSchema>) => {
        const userMessage: Message = {
            role: "user",
            content: values.prompt,
            name: user?.name
        }
        setMessages((prevMessages) => [...prevMessages, userMessage])

        startTransition(() => {
            fetchStream([...messages,{role: "user", content: values.prompt,name: user?.name}])
        })
    }

    return (
        <div className="relative flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                <ChatBotMessages response={updatingText} messages={memoizedMessages} />
            </div>
            <div className="sticky bottom-0 p-4">
                <ChatBotForm onSubmit={onSubmit} isPending={isFetching} />
            </div>
        </div>
    )
}
