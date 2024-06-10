import { atom } from "jotai";

type chatModel = "google/gemini-flash-1.5" | "microsoft/phi-3-mini-128k-instruct:free" | "microsoft/phi-3-mini-128k-instruct:free"

export const chatModelAtom = atom<chatModel>("google/gemini-flash-1.5")