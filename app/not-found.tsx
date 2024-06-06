import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import { FaHome } from "react-icons/fa"

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card>
                <CardHeader><h1 className="text-muted-foreground text-sm font-semibold text-center">You seem to have gotten lost!</h1></CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    <Logo />
                    <p className="text-center">The page you are looking for does not exist.</p>
                    <Button variant={"secondary"} asChild className="w-full"><Link href={"/"}>Go back!</Link></Button>
                </CardContent>
            </Card>
        </div>
    )
}
export default NotFoundPage