"use client"
import { ModeToggleText } from "@/components/mode-toggle-text"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "next-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface SettingsAccountProps {
    user?:User
}
export const SettingsAccount = ({user}:SettingsAccountProps) => {
    const router = useRouter()
    useEffect(()=>{
        router.refresh()
    },[])
  return (
    <Card className="md:min-w-[400px]">
        <CardHeader><h3 className="text-muted-foreground text-sm font-semibold text-center">Overview of account info</h3></CardHeader>
        <CardContent>
            <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{user?.name || "Please set a name!"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{user?.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Theme</TableCell>
                            <TableCell><ModeToggleText/></TableCell>
                        </TableRow>
                    </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}