import { Chat } from "@prisma/client";
import { atom } from "jotai";

type chatModel = string

export const chatModelAtom = atom<chatModel>("mistralai/mixtral-8x22b-instruct")
export const chatsStateAtom = atom<Chat[]>([])