import { Check, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from "@/lib/utils"
import { Space_Mono } from "next/font/google"
import { useState } from "react"

interface HighlightedSyntaxProps {
    children:string
    className?:string
    match:RegExpMatchArray
    rest:any
}

const spaceMono = Space_Mono({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "700"],
})

export const HighlightedSyntax = ({children,className,match,rest}:HighlightedSyntaxProps) => {
    const [copyStatus, setCopyStatus] = useState<boolean>(false);
    const onCopyText = () => {
        navigator.clipboard.writeText(children)
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 3000); // Reset status after 2 seconds
      }
  return (
    <div className="relative">
  {/* Copy button */}
  <Button variant={"ghost"} disabled={copyStatus} className="absolute top-2 right-2" onClick={onCopyText}>
    {!copyStatus ? (<Clipboard size={15}/>) : (<Check size={15}/>)}
    </Button>
  <SyntaxHighlighter
    {...rest}
    PreTag="div"
    language={match[1]}
    className={cn(spaceMono.className, "text-[12px] md:text-base", className)}
    style={oneDark}
    ref={node => {
      if (node) {
        // Do something with the ref if needed
      }
    }}
  >
    {children}
  </SyntaxHighlighter>
</div>
  )
}