"use client"
import { siteConfig } from "@/config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { usePathname } from "next/navigation"

export const LoginPageFAQ = () => {
    const pathname = usePathname()
    const isloginPage = (pathname === "/auth/login")
    const faqs = [{
        question:`What is ${siteConfig.name}? and how does it work?`,
        answer:`${siteConfig.name} is a next generation AI assistant built for communicating effortlessly in your preferred Language` 
    },{
        question:`What should I use ${siteConfig.name} for?`,
        answer:`${siteConfig.name} can be used for a variety of tasks such as answering questions, providing information, and more.`
    },{
        question:`Is ${siteConfig.name} free?`,
        answer:`Yes, ${siteConfig.name} is free to use.`
    }]
    if(!isloginPage) return null

  return (
    <div className="flex mt-5 flex-col gap-10 justify-center items-center">
        <div>
        <h2 className="max-w-xl text-xl text-center">{siteConfig.name} is a next generation AI assistant built for communicating effortlessly in your preferred Language</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <h2 className="">Cant find an answer? Here's our frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-[80%] md:w-[512px]">
            {faqs.map((faq, index) => (
                <AccordionItem className="bg-secondary rounded-lg px-5 my-2" value={`item-${index+1}`} key={index}>
                    <AccordionTrigger>
                        <h3>{faq.question}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>{faq.answer}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
        </div>
    </div>
  )
}