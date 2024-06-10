import { Message } from "@/components/chat/chat-bot"
import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaRobot } from "react-icons/fa"
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from "@/lib/utils"
import { Space_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import { HighlightedSyntax } from "./highlighted-syntax"

interface ChatBotMessagesProps {
    messages?: Message[]
    response?: string
}
const spaceMono = Space_Mono({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "700"],
})

const inter = Inter({
    subsets: ["latin"],
})

export const ChatBotMessages = ({ messages, response }: ChatBotMessagesProps) => {
    const endMessageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (endMessageRef.current) {
            endMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, response])

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
                            <Card>
                                <CardHeader><span className="flex gap-2 items-center font-bold text-muted-foreground select-none border-b pb-1">Ragna <FaRobot size={25} /></span></CardHeader>
                                <CardContent>
                                    <Markdown
                                        components={{
                                            code(props) {
                                                const { children, className, node, ...rest } = props
                                                const match = /language-(\w+)/.exec(className || '')
                                                return match ? (
                                                    <HighlightedSyntax rest={rest} className={className} match={match}>
                                                        {String(children).replace(/\n$/, '')}
                                                    </HighlightedSyntax>
                                                ) : (
                                                    <code {...rest} className={cn(spaceMono.className, "bg-secondary", className)}>
                                                        {children}
                                                    </code>
                                                )
                                            }
                                        }}>
                                        {message.content}
                                    </Markdown>
                                </CardContent>
                            </Card>
                        </div>
                    )
                }
            })}
            {response && (
                <div className="w-full">
                    <Card>
                        <CardHeader><span className="flex gap-2 items-center font-bold text-muted-foreground select-none border-b pb-1">Ragna<FaRobot size={25} /></span></CardHeader>
                        <CardContent>
                            <Markdown
                                components={{
                                    code(props) {
                                        const { children, className, node, ...rest } = props
                                        const match = /language-(\w+)/.exec(className || '')
                                        return match ? (
                                            <div className="relative">
                                                {/* Copy button */}
                                                <button
                                                    className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                    onClick={() => {
                                                        // Handle copy functionality here
                                                    }}
                                                >
                                                    Copy
                                                </button>

                                                {/* SyntaxHighlighter component */}
                                                <SyntaxHighlighter
                                                    {...rest}
                                                    PreTag="div"
                                                    language={match[1]}
                                                    className={cn(spaceMono.className, "text-[12px] md:text-base", className)}
                                                    style={oneDark}
                                                    ref={node => {
                                                        if (node) {
                                                            // Do something with the ref if needed
                                                        }
                                                    }}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            </div>
                                        ) : (
                                            <code {...rest} className={cn(spaceMono.className, "bg-secondary", className)}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >{response}
                            </Markdown>
                        </CardContent>
                    </Card>
                </div>
            )}
            <div ref={endMessageRef}></div>
        </div>
    )
}