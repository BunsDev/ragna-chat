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
        value:"mistralai/mixtral-8x22b",
        label:"4AM"
    },{
        value:"mistralai/mixtral-8x22b-instruct",
        label:"6AM"
    },{
        value:"mistralai/mixtral-8x7b-instruct:nitro",
        label:"8AM"
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