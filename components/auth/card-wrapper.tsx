import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { siteConfig } from "@/config"

interface CardWrapperProps {
    children: React.ReactNode
}
export const CardWrapper = ({children}:CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <p className="text-muted-foreground">Start using {siteConfig.name} for yourself or your team</p>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
        </Card>
    )
}