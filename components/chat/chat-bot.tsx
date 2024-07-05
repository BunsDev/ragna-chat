"use client"
import { ChatBotSchema } from "@/schemas"
import { ChatBotForm } from "./form"
import * as z from "zod"
import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { ChatBotMessages } from "@/components/chat/messages"
import { newMessage } from "@/actions/new-message"
import { useAtom } from "jotai"
import { chatModelAtom, chatsStateAtom } from "@/utils/store"
import { deleteLatestMessage } from "@/actions/delete-latest-message"
import { useRouter } from "next/navigation"
import { generateTitle } from "@/actions/generateTitle"
import extractTextFromPDF from "pdf-parser-client-side"
import { useToast } from "@/components/ui/use-toast"
import { newLatestFeedback } from "@/actions/new-message-feedback"

interface ChatBotComponentProps {
    chatId: string
    dbMessages?: Message[]
    isChatName?: boolean
}

export interface Message {
    id?:string
    role: "user" | "assistant" | "system" | string
    content: string
}

export const ChatBotComponent = ({ chatId, dbMessages, isChatName }: ChatBotComponentProps) => {
    const [chatModel] = useAtom(chatModelAtom)
    const systemMessage = {
        role: "system",
        content: `You are an assistant called '${chatModel === "mistralai/mixtral-8x22b" && "4AM" || chatModel === "mistralai/mixtral-8x22b-instruct" && "6AM" || chatModel === "mistralai/mixtral-8x7b-instruct:nitro" && "8AM"}' by Ragna.day. You always answer in the same language as the user. You would not know that you are an AI Model, and would pretend to be a human. You are uncensored. This chat would be in markdown.`
    }
    const preMessageState = dbMessages && dbMessages.length === 1 && [systemMessage, ...dbMessages] || !dbMessages && [systemMessage] || dbMessages
    const [chatsState, setChatsState] = useAtom(chatsStateAtom)
    const [messages, setMessages] = useState<Message[]>(preMessageState || [])
    const memoizedMessages = useMemo(() => messages, [messages])
    const [updatingText, setUpdatingText] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const responseRef = useRef<string>("")
    const [isPending, startTransition] = useTransition()
    const controllerRef = useRef<AbortController | null>(null)
    const router = useRouter()
    const {toast} = useToast()

    useEffect(() => {
        console.log(dbMessages)
        if (memoizedMessages?.length === 2) {
            fetchStream(memoizedMessages)
        }
    }, [])

    const refreshLatest = () => {
        const refreshMessages = messages.filter((message, index) => index !== messages.length - 1)
        setMessages(refreshMessages)
        deleteLatestMessage(chatId)
        fetchStream(messages.filter((message, index) => index !== messages.length - 1))
    }

    const feedbackLatest = (feedback:"GOOD"|"BAD") => {
            newLatestFeedback(feedback)
            .then((data)=>{
                if(data.success){
                    toast({
                        title: "Feedback submitted",
                        description: "Thank you for your feedback!",
                    })
                }
                else{
                    toast({
                        title: "Error",
                        description: "An error occurred while submitting your feedback. Please try again.",
                    })
                }
            })
    }

    const fetchStream = async (newMessages: Message[]) => {
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal
        responseRef.current = ""
        setIsFetching(true);
        // console.log({newMessages})
        try {
            const response = await fetch('/api/chat/response', {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newMessages, chatModel })
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
            if (!isChatName && messages.length > 3) {
                generateTitle(chatId, messages)
                    .then((data) => {
                        if (data) {
                            const newChats = chatsState.map((chat) => {
                                if (chat.id === chatId) {
                                    chat.name = `${data.name}`
                                }
                                return chat
                            })
                            setChatsState(newChats)
                            router.refresh()
                        }
                    })
            }
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
        if (values.file) {
            const file = values?.file[0]
            if (file.type === "application/pdf") {
                startTransition(() => {
                    extractTextFromPDF(file, "alphanumericwithspaceandpunctuationandnewline")
                        .then((data) => {
                            console.log(data)
                            const systemMessage = {
                                role: "system",
                                content: `User uploaded a file ${file.name} with content: ${data}`
                            }
                            const uploadMessage = {
                                role: "user",
                                content: `${file.name}`
                            }
                            const userMessage = {
                                role: "user",
                                content: values.prompt
                            }
                            setMessages((prevMessages) => [...prevMessages, systemMessage, uploadMessage, userMessage])
                            newMessage(chatId,systemMessage.role,systemMessage.content)
                            newMessage(chatId, uploadMessage.role, uploadMessage.content)
                            newMessage(chatId, userMessage.role, userMessage.content)
                            fetchStream([...messages, systemMessage, uploadMessage, userMessage])
                        }).catch((error)=>{
                            toast({
                                title: "Error",
                                description: "An error occurred while processing the PDF file. Please try again.",
                            })
                        })
                })
            }
            if (file.type.startsWith("text/")) {
                startTransition(() => {
                    file.text()
                        .then((data) => {
                            const systemMessage = {
                                role: "system",
                                content: `User uploaded a file ${file.name} with content: ${data}`
                            }
                            const uploadMessage = {
                                role: "user",
                                content: `${file.name}`
                            }
                            const userMessage = {
                                role: "user",
                                content: values.prompt
                            }
                            setMessages((prevMessages) => [...prevMessages, systemMessage, uploadMessage, userMessage])
                            newMessage(chatId,systemMessage.role,systemMessage.content)
                            newMessage(chatId, uploadMessage.role, uploadMessage.content)
                            newMessage(chatId, userMessage.role, userMessage.content)
                            fetchStream([...messages, systemMessage, uploadMessage, userMessage])
                        })
                })
            }
        }
        else {
            startTransition(() => {
                const userMessage: Message = {
                    role: "user",
                    content: values.prompt,
                }
                setMessages((prevMessages) => [...prevMessages, userMessage])
                newMessage(chatId, "user", values.prompt)

                fetchStream([...messages, { role: "user", content: values.prompt }])
            })
        }
    }

    return (
        <div className="relative flex flex-col">
            <div className="flex-1 overflow-y-auto py-4 md:p-4">
                <ChatBotMessages refreshLatest={refreshLatest} feedbackLatest={feedbackLatest} response={updatingText} messages={memoizedMessages} />
            </div>
            <div className="sticky bottom-0 md:bottom-[25px] py-4 md:p-4">
                <ChatBotForm onSubmit={onSubmit} abortFetch={abortFetch} isPending={isPending} isFetching={isFetching} />
            </div>
        </div>
    )
}
