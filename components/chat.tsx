"use client"
import { ChatBotSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button"
import { SendIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { User } from "next-auth"

interface ChatBotComponentProps {
    user?: User
}

export const ChatBotComponent = ({ user }: ChatBotComponentProps) => {
    const messages = [
        {
            "role": "user",
            "content": "Hey, can you help me with some coding questions?"
        },
        {
            "role": "assistant",
            "content": "Sure, I'd be happy to help! What specific coding questions do you have?"
        },
        {
            "role": "user",
            "content": "I'm trying to figure out how to implement a binary search algorithm in Python. Can you show me an example?"
        },
        {
            "role": "assistant",
            "content": "Of course! Here's an example of a binary search algorithm in Python:\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\n# Example usage:\narr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\ntarget = 7\nresult = binary_search(arr, target)\nprint(\"Element found at index:\", result)\n```\nThis function searches for a target value within a sorted array and returns the index of the target if found, otherwise, it returns -1."
        },
        {
            "role": "user",
            "content": "Thanks! That really helps. Can you also explain the time complexity of this algorithm?"
        },
        {
            "role": "assistant",
            "content": "Sure! The binary search algorithm has a time complexity of O(log n). This is because the algorithm divides the search range in half with each iteration, which means it eliminates half of the remaining elements in the array with each comparison. This logarithmic reduction in the number of elements to be checked results in a much faster search time compared to a linear search, especially for large datasets."
        }
    ]
    

    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ChatBotSchema>>({
        resolver: zodResolver(ChatBotSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const onSubmit = async (values: z.infer<typeof ChatBotSchema>) => {
        startTransition(() => {
            console.log(values)
        })
    }

    const handleInput = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current
            textarea.style.height = 'auto' // Reset height to auto to correctly calculate new height
            textarea.style.height = `${Math.min(textarea.scrollHeight, 7 * 24)}px` // 24px per line, 7 lines max
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <section className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto md:w-[800px] mb-[100px]">
                {!messages && (
                    <div className="flex flex-col justify-center items-center h-full">
                        <h1 className="font-bold text-3xl text-center text-foreground/50">Chat with ragna</h1>
                        <p className="text-center font-semibold text-foreground/50">Ask me anything!</p>
                    </div>
                )}
                {messages && (
                    <div className="flex flex-col gap-5 max-h-full overflow-y-auto pr-2">
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
                                    <div key={index} className="flex min-w-full">
                                        <Card>
                                            <CardHeader>Ragna</CardHeader>
                                            <div className="p-2">{message.content}</div>
                                        </Card>
                                    </div>
                                )
                            }
                        })}
                        <div ref={messagesEndRef}></div>
                    </div>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="fixed bottom-0 background-inherit/80 backdrop-blur-lg rounded-lg left-0 w-full md:w-[800px] md:left-[265px] p-4">
                    <div className="flex justify-center gap-2 mx-auto w-full">
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel hidden={true}>prompt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter your prompt"
                                            className="w-full min-h-[30px] h-auto resize-none pr-20 text-[16px]"
                                            rows={1} // Initial rows
                                            ref={textareaRef}
                                            onInput={handleInput} // Dynamically adjust height on input
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-auto"
                            variant={"secondary"}
                        >
                            <SendIcon size={25} />
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}
