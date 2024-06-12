"use client"
import { useAtom } from "jotai";
import {chatModelAtom} from "@/utils/store"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export const ModelDropdown = ({className=""}:{className?:string}) => {
    const [model,setModel] = useAtom(chatModelAtom)
    const handleChange = (model:string) => {
        setModel((prev)=>(model))
    }
    const models = [{
        value:"meta-llama/llama-3-8b-instruct:free",
        label:"Meta llama"
    },{
        value:"microsoft/phi-3-mini-128k-instruct:free",
        label:"Microsoft Phi"
    },{
        value:"google/gemini-flash-1.5",
        label:"Google Gemini"
    },{
        value:"openai/gpt-3.5-turbo",
        label:"OpenAI GPT-3.5"
    }]
  return (
    <Select onValueChange={handleChange} value={model}>
    <SelectTrigger className={className}>
        <SelectValue placeholder="Select A model" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
            <SelectLabel>Models</SelectLabel>
            {models.map(({value,label})=>(
                <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
        </SelectGroup>
    </SelectContent>
</Select>
  )
}