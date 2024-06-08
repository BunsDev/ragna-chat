import { SettingsAccount } from "@/components/protected/settings/account"
import SettingsDelete from "@/components/protected/settings/delete"
import { SettingsName } from "@/components/protected/settings/name"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentUser } from "@/lib/auth"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { PencilIcon, TriangleAlertIcon, User2 } from "lucide-react"

const SettingsPage = async () => {
    const user = await currentUser()
    return (
        <main className="flex justify-center pt-[100px]">
            <Tabs defaultValue="account" className="">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account" className="flex items-center gap-2">Account <User2 size={15}/></TabsTrigger>
                    <TabsTrigger value="name" className="flex items-center gap-2">Name <PencilIcon size={15}/></TabsTrigger>
                    <TabsTrigger value="delete" className="flex items-center gap-2">Delete <TriangleAlertIcon size={15}/></TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <SettingsAccount user={user} />
                </TabsContent>
                <TabsContent value="name">
                    <SettingsName user={user} />
                </TabsContent>
                <TabsContent value="delete">
                    <SettingsDelete user={user}/>
                </TabsContent>
            </Tabs>
        </main>
    )
}
export default SettingsPage