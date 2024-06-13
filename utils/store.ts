import { atom } from "jotai";

type chatModel = string

export const chatModelAtom = atom<chatModel>("mistralai/mixtral-8x22b-instruct")