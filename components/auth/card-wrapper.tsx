import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { siteConfig } from "@/config"
import { Button } from "../ui/button"
import { FaApple } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel?: string
    showTnC?:boolean
    showOAuth?:boolean
}
export const CardWrapper = ({ children, headerLabel = `Start using ${siteConfig.name} for yourself or your team`,showTnC=false,showOAuth=false }
    : CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <p className="text-muted-foreground text-sm font-semibold text-center">{headerLabel}</p>
            </CardHeader>
            <CardContent>
                {children}
                {showOAuth && (
                    <div className="flex flex-col mt-4 gap-y-4 items-center justify-center">
                        <p className="text-muted-foreground font-semibold text-sm text-center">OR</p>
                        <div className="flex w-full md:flex-row flex-col gap-4 justify-center items-center">
                            <Button onClick={async ()=> await signIn("google",{redirectTo: DEFAULT_LOGIN_REDIRECT})} variant={"outline"} className="btn w-full btn-primary">Continue with &nbsp;<FcGoogle size={25}/>&nbsp;Google</Button>
                            <Button onClick={async ()=> await signIn("apple",{redirectTo: DEFAULT_LOGIN_REDIRECT})} variant={"outline"} className="btn w-full btn-primary">Continue with &nbsp;<FaApple size={25}/>&nbsp;Apple</Button>
                        </div>
                    </div>
                
                )}
            </CardContent>
            {}
            {showTnC && (<CardFooter className="flex flex-col gap-y-2 max-w-md">
                <h3 className="text-muted-foreground text-sm font-semibold self-start">
                    Accept terms and conditions
                </h3>
                <p className="text-sm">{`By continuing you agree to ${siteConfig.name}'s `}<a className="underline" href="/">Consumer Terms</a> and <a className="underline" href="/">Usage policy</a>, and acknowledge their <a className="underline" href="/">Privacy Policy</a>.</p>
            </CardFooter>)}
        </Card>
    )
}