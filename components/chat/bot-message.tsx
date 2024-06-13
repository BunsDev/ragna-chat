import MarkdownRMD from "react-markdown"
import { HighlightedSyntax } from "./highlighted-syntax"
import { Space_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { FaRobot } from "react-icons/fa"
import "./bot-message.css"
import { Button } from "../ui/button"
import { useState } from "react"
import { Check, Clipboard } from "lucide-react"
import { Separator } from "../ui/separator"

const spaceMono = Space_Mono({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "700"],
})

interface BotMessageProps {
    children: string
    live?: boolean
}

export const BotMessage = ({ children, live = false, }: BotMessageProps) => {
    const [copyStatus, setCopyStatus] = useState<boolean>(false);
    const onCopyText = () => {
        navigator.clipboard.writeText(children)
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 3000); // Reset status after 2 seconds
    }
    return (
        <Card>
            <CardHeader>
                <span className="flex gap-2 items-center font-bold text-muted-foreground select-none border-b pb-1">
                    <FaRobot size={25} /> Ragna {live && ("is thinking")}{live && (
                        <p className="flex items-center space-x-1">
                            <span className="dot bg-gray-800 rounded-full w-2 h-2 animate-blink dark:bg-white"></span>
                            <span className="dot bg-gray-800 rounded-full w-2 h-2 animate-blink animation-delay-200 dark:bg-white"></span>
                            <span className="dot bg-gray-800 rounded-full w-2 h-2 animate-blink animation-delay-400 dark:bg-white"></span>
                        </p>
                    )}
                </span>
            </CardHeader>
            <CardContent>
                <MarkdownRMD
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
                    {children}
                </MarkdownRMD>
            </CardContent>
            <CardFooter className="flex flex-col space-y-1">
            <Separator/>
            <div className="flex gap-1 items-center ml-auto">
                <p className="font-semibold text-sm text-muted-foreground select-none">Copy entire message</p>
            <Button variant={"ghost"}  onClick={()=>onCopyText()}>
                {!copyStatus ? (<Clipboard size={15} />) : (<Check size={15} />)}
                </Button>
            </div>
            </CardFooter>
        </Card>
    )
}