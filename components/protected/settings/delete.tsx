"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User } from 'next-auth'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { deleteAccount, deleteCodeAction } from '@/actions/delete'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SettingsDeleteSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { BarLoader } from 'react-spinners'
import * as z from 'zod'
import { signOut } from 'next-auth/react'

interface SettingsDeleteProps {
    user?: User
}
const SettingsDelete = ({ user }: SettingsDeleteProps) => {
    const { toast } = useToast()
    const [showCode, setShowCode] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsDeleteSchema>>({
        resolver: zodResolver(SettingsDeleteSchema),
        defaultValues: {
            code: "",
        }
    })

    const sendCodeEmail = () => {
        startTransition(() => {
            deleteCodeAction(user?.email!)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: data?.error
                        })
                    }
                    if (data?.success) {
                        toast({
                            title: data?.success
                        })
                        setShowCode(true)
                    }
                })
        })
    }
    const onSubmit = (values: z.infer<typeof SettingsDeleteSchema>) => {
        startTransition(async () => {
            deleteAccount(values, user?.email!)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: data?.error
                        })
                    }
                    if (data?.success) {
                        toast({
                            title: data?.success
                        })
                        signOut()
                    }
                })
        })
    }
    return (
        <Card className='md:min-w-[400px]'>
            <CardHeader><h3 className="text-muted-foreground text-sm font-semibold text-center">Delete your account</h3></CardHeader>
            <CardContent>
                {!showCode && (
                    <div className='flex w-full'>
                        <Button className='w-full' onClick={() => sendCodeEmail()}>{isPending ? <BarLoader className="invert dark:invert-0" /> : "Delete"}</Button>
                    </div>
                )}
                {showCode && (
                    <div className='flex justify-center'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} type="text" placeholder="XXXXXX" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' variant={"destructive"}>{isPending ? <BarLoader className="invert dark:invert-0" /> : "Delete my account"}</Button>
                            </form>
                        </Form>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
export default SettingsDelete