"use client";
import "./text.css"

import { useState, useRef, useEffect } from "react";

export const Testing = () => {
    const [response, setResponse] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const responseRef = useRef<string>("")
    const endRef = useRef<HTMLDivElement>(null);
    interface message{
        role: "user" | "assistant",
        content:string,
    }
    const [messages,setMessages] = useState<message[]>()
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [response]);

    const fetchStream = async () => {
        setIsFetching(true);
        const response = await fetch('/api/chat/response', { // Replace '/api/your-endpoint' with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: "how to make banking app in javascript simple code" }) // Replace with your actual prompt
        })

        const reader = response.body!.getReader()
        const decoder = new TextDecoder('utf-8')

        while (true) {
            const { value, done } = await reader.read()
            if (done) {
                break
            }
            const chunk = decoder.decode(value, { stream: true });
            console.log(chunk)
            
            // Update the ref
            responseRef.current += chunk
            
            // Force a state update to re-render the component
            setResponse((responseRef.current))
        }

        setIsFetching(false)
    }

    return (
        <div className="p-4">
            <div className="border border-gray-300 p-4 rounded-md max-w-[500px]">
                <p className="whitespace-pre-wrap font-mono">{response}{isFetching && <span className="animate-blink">|</span>}</p>
            </div>
            <div ref={endRef}></div>
            <button 
                onClick={fetchStream} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Start Streaming
            </button>
        </div>
    );
};
