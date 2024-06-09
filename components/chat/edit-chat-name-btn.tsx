import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PencilIcon } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { EditChatNameSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"

interface EditChatNameButtonProps {
    handleNameChange: (chatId: string, name: string) => void
    chatId: string
    isPending: boolean
}

export const EditChatNameButton = ({ handleNameChange, chatId,isPending }: EditChatNameButtonProps) => {
    const form = useForm<z.infer<typeof EditChatNameSchema>>({
        resolver: zodResolver(EditChatNameSchema),
        defaultValues: {
            name: ""
        }
    })

    const handleSubmit = (values: z.infer<typeof EditChatNameSchema>) => {
        handleNameChange(chatId, values.name)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} variant="ghost"><PencilIcon size={15} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Chat Name</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder="Enter a name for chat" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}