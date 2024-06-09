"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChatBotSchema } from "@/schemas"
import * as z from "zod"
import { useRef, useTransition } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { ClipLoader } from "react-spinners"
import { makeNewChatwithValue } from "@/actions/new-chat-home"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface HomeChatBotFormProps {
    userId: string
}

export const HomeChatBotForm = ({ userId }: HomeChatBotFormProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { toast } = useToast()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ChatBotSchema>>({
        resolver: zodResolver(ChatBotSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const handleInput = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current
            textarea.style.height = 'auto' // Reset height to auto to correctly calculate new height
            textarea.style.height = `${Math.min(textarea.scrollHeight, 7 * 24)}px` // 24px per line, 7 lines max
        }
    }

    const onSubmitHandler = (values: z.infer<typeof ChatBotSchema>) => {
        startTransition(() => {
            makeNewChatwithValue(values.prompt, userId)
                .then((data) => {
                    if (data.success) {
                        router.push(`/chat/${data.chat.id}`)
                    }
                    if(data.error) {
                        toast({
                            title:data.error
                        })
                    }
                })
        })

    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) {
            e.preventDefault();
            form.handleSubmit(onSubmitHandler)()
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={(form.handleSubmit(onSubmitHandler))} className="pt-1 w-full">
                <div className="relative w-full space-x-2 bg-background rounded-lg ">
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel hidden={true}>prompt</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Create new chat..."
                                        className="min-h-[30px] h-auto resize-none pr-20 text-[16px] whitespace-pre-wrap"
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
                            disabled={isPending}
                            variant={"ghost"}
                        >
                            {!isPending ? <SendIcon size={20} /> : <ClipLoader size={20} />}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}