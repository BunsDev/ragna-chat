import { atom } from "jotai";

type chatModel = string

export const chatModelAtom = atom<chatModel>("google/gemini-flash-1.5")