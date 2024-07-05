"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { login } from "@/actions/login"
import { BarLoader } from "react-spinners"
import { CardFooter } from "../ui/card"
import Link from "next/link"

export const LoginForm = () => {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [showCode, setShowCode] = useState<boolean>(false)
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            code: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data.error) {
                        toast({
                            title: data.error
                        })
                    }
                    if (data.success) {
                        toast({
                            title: data.success
                        })
                    }
                    if(data.code){
                        setShowCode(true)
                    }
                })
        })
    }
    return (
        <CardWrapper showTnC showOAuth>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending || showCode} type="email" placeholder="Enter your work or personal email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {showCode && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter the code sent to your email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} type="text" placeholder="XXXXXX" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button type="submit" disabled={isPending}>
                        {!isPending && ( !showCode ? "Continue with email" : "Login")}
                        {isPending && (<BarLoader className="invert dark:invert-0"/>)}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}