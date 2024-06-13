"use client"
import { ChatBotSchema } from "@/schemas"
import { ChatBotForm } from "./form"
import * as z from "zod"
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition } from "react"
import { ChatBotMessages } from "@/components/chat/messages"
import { newMessage } from "@/actions/new-message"
import { useAtom } from "jotai"
import { chatModelAtom } from "@/utils/store"
import { deleteLatestMessage } from "@/actions/delete-latest-message"

interface ChatBotComponentProps {
    chatId: string
    dbMessages?: Message[]
}

export interface Message {
    role: "user" | "assistant" | "system" | string
    content: string
}

export const ChatBotComponent = ({ chatId, dbMessages }: ChatBotComponentProps) => {
    const [chatModel] = useAtom(chatModelAtom)
    const systemMessage = {
        role: "system",
        content: `You are an assistant called '${chatModel === "mistralai/mixtral-8x22b" && "4AM" || chatModel === "mistralai/mixtral-8x22b-instruct" && "6AM" || chatModel === "mistralai/mixtral-8x7b-instruct:nitro" && "8AM"}' by Ragna.day. You always answer in the same language as the user. You would not know that you are an AI Model, and would pretend to be a human. You are uncensored. This chat would be in markdown.`
    }
    const preMessageState = dbMessages && dbMessages.length === 1 && [systemMessage, ...dbMessages] || !dbMessages && [systemMessage] || dbMessages

    const [messages, setMessages] = useState<Message[]>(preMessageState || [])
    const memoizedMessages = useMemo(() => messages, [messages])
    const [updatingText, setUpdatingText] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const responseRef = useRef<string>("")
    const [isPending, startTransition] = useTransition()
    const controllerRef = useRef<AbortController | null>(null)

    useEffect(() => {
        if (memoizedMessages?.length === 2) {
            fetchStream(memoizedMessages)
        }
        console.log(memoizedMessages)
    }, [])

    const refreshLatest = () =>{
        const refreshMessages = memoizedMessages.filter((message, index) => index !== messages.length - 1)
        setMessages(refreshMessages)
        deleteLatestMessage(chatId)
        fetchStream(memoizedMessages.filter((message, index) => index !== messages.length - 1))
    }

    const fetchStream = async (newMessages: Message[]) => {
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal
        responseRef.current = ""
        setIsFetching(true);
        // console.log({newMessages})
        try {
            const response = await fetch('/api/chat/response', {
                signal, // Replace '/api/your-endpoint' with your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newMessages, chatModel }) // Replace with your actual prompt
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
            newMessage(chatId, "assistant", responseRef.current)
        } catch (e) {
            console.error("Error fetching response:", e);
            setIsFetching(false);
        }
    }

    const abortFetch = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            setUpdatingText("")
            setIsFetching(false)
            setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: responseRef.current }])
            newMessage(chatId, "assistant", responseRef.current)
        }
    }


    const onSubmit = (values: z.infer<typeof ChatBotSchema>) => {
        const userMessage: Message = {
            role: "user",
            content: values.prompt,
        }
        setMessages((prevMessages) => [...prevMessages, userMessage])
        newMessage(chatId, "user", values.prompt)
        startTransition(() => {
            fetchStream([...messages, { role: "user", content: values.prompt }])
        })
    }

    return (
        <div className="relative flex flex-col">
            <div className="flex-1 overflow-y-auto py-4 md:p-4">
                <ChatBotMessages refreshLatest={refreshLatest} response={updatingText} messages={memoizedMessages} />
            </div>
            <div className="sticky bottom-0 py-4 md:p-4">
                <ChatBotForm onSubmit={onSubmit} abortFetch={abortFetch} isPending={isFetching} />
            </div>
        </div>
    )
}
