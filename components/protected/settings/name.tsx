"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { User } from "next-auth"
import { SettingsNameSchema } from "@/schemas"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { BarLoader } from "react-spinners"
import { updateName } from "@/actions/name"
import { useRouter } from "next/navigation"


interface SettingsNameProps {
    user?: User
}
export const SettingsName = ({ user }: SettingsNameProps) => {

    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof SettingsNameSchema>>({
        resolver: zodResolver(SettingsNameSchema),
        defaultValues: {
            name: user?.name || "",
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsNameSchema>) => {
        startTransition(()=>{
            updateName(values,user?.id!)
            .then((data)=>{
                if (data.error) {
                    toast({
                        title: data.error
                    })
                }
                if (data.success) {
                    toast({
                        title: data.success
                    })
                    router.refresh()

                }
            })
        })
    }

    return (
        <Card className="md:min-w-[400px]">
            <CardHeader><h3 className="text-muted-foreground text-sm font-semibold text-center">Change your name</h3></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} type="text" placeholder="Enter your name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? <BarLoader className="invert dark:invert-0"/> : "Save"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}