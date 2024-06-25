import { Button } from "@/components/ui/button"
import { FaExternalLinkAlt } from "react-icons/fa"
import Link from "next/link"
import { FcSms } from "react-icons/fc"
import { Logo } from "@/components/logo"
import { ModeToggle } from "../mode-toggle"

export const AuthNavbar = () => {
    return (
        <header className="md:px-10 flex justify-between">
            <Logo />
            <div className="flex gap-5">
                <Button asChild variant={"default"}>
                    <Link href={"/try"}>Trial Mode
                    {/* &nbsp;<FaExternalLinkAlt /> */}
                    </Link>
                </Button>
                <span className="hidden md:block"><ModeToggle/></span>
            </div>
        </header>
    )
}