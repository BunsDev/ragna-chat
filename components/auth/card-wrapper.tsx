import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { siteConfig } from "@/config"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel?: string
}
export const CardWrapper = ({ children, headerLabel = `Start using ${siteConfig.name} for yourself or your team` }
    : CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <p className="text-muted-foreground">{headerLabel}</p>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}