import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { siteConfig } from "@/config"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel?: string
    showTnC?:boolean
}
export const CardWrapper = ({ children, headerLabel = `Start using ${siteConfig.name} for yourself or your team`,showTnC=false }
    : CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <p className="text-muted-foreground text-sm font-semibold text-center">{headerLabel}</p>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showTnC && (<CardFooter className="flex flex-col gap-y-2 max-w-md">
                <h3 className="text-muted-foreground text-sm font-semibold self-start">
                    Accept terms and conditions
                </h3>
                <p className="text-sm">By continuing you agree to {siteConfig.name}'s <a className="underline" href="/">Consumer Terms</a> and <a className="underline" href="/">Usage policy</a>, and acknowledge their <a className="underline" href="/">Privacy Policy</a>.</p>
            </CardFooter>)}
        </Card>
    )
}