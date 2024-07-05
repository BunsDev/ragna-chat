"use client"
import * as z from "zod"
import { ChatBotSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRef, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { Cross1Icon, StopIcon } from "@radix-ui/react-icons"
import { Input } from "../ui/input"
import { FaPaperclip } from "react-icons/fa"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig } from "@/config"

interface ChatBoxFormProps {
    onSubmit: (values: z.infer<typeof ChatBotSchema>) => void
    isPending: boolean
    isFetching: boolean
    abortFetch: () => void
}

export const ChatBotForm = ({ onSubmit, isPending, abortFetch,isFetching }: ChatBoxFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const form = useForm<z.infer<typeof ChatBotSchema>>({
        resolver: zodResolver(ChatBotSchema),
        defaultValues: {
            file: undefined,
            prompt: ""
        }
    })

    const handleInput = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current
            textarea.style.height = 'auto' // Reset height to auto to correctly calculate new height
            textarea.style.height = `${Math.min(textarea.scrollHeight, 7 * 16)}px` // 24px per line, 7 lines max
        }
    }
    const onSubmitHandler = (values: z.infer<typeof ChatBotSchema>) => {
        onSubmit(values)
        setFiles([])
        form.reset()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) {
            e.preventDefault();
            form.handleSubmit(onSubmitHandler)()
        }
    }
    return (
        <>
        <Form {...form}>
            <form onSubmit={(form.handleSubmit(onSubmitHandler))} className="pt-1 w-full">
            {files[0] && (
                            <div className="w-full bg-background px-6 flex items-center justify-between">

                            <p>{files[0].name}</p>
                            <Button
                                variant={"ghost"}
                                onClick={() => {
                                    setFiles([])
                                    form.setValue("file", undefined)
                                }}
                            >
                                <Cross1Icon />
                            </Button>
                            </div>)}
                <div className="relative w-full space-x-2 bg-background rounded-lg ">
                
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant={"ghost"} asChild>
                                                    <FormLabel className="hover:cursor-pointer">
                                                        <FaPaperclip size={20} />
                                                    </FormLabel>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Upload Text/PDF 5MB Max</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <FormControl>
                                        <Input
                                        disabled={isPending || isFetching}
                                            className="hidden"
                                            onChange={(e) => {
                                                const filesArray = Array.from(e.target.files || []);
                                                setFiles(filesArray);
                                                field.onChange(filesArray);
                                            }}
                                            accept={".txt,.pdf"}
                                            type="file" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel hidden={true}>Prompt</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Enter your prompt"
                                        className="min-h-[30px] h-auto resize-none pl-[4rem] pr-20 text-[16px] whitespace-pre-wrap"
                                        rows={1} // Initial rows
                                        ref={textareaRef}
                                        onInput={handleInput}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <Button
                            type="submit"
                            onClick={() => {
                                if (isPending || isFetching) {
                                    abortFetch()
                                    console.log("fetch aborted")
                                }
                            }}
                            variant={"ghost"}
                        >
                            {!(isPending || isFetching) ? <SendIcon size={20} /> : <StopIcon />}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
        {/* <div><p className="text-muted-foreground text-sm text-center pt-2">{siteConfig.name} can make mistakes. Check important info.</p></div> */}
        </>
    )
}