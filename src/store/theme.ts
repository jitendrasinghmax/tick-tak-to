import { atom } from "recoil";

export const themeAtom=atom<"dark"|"light">({
    key:"theme",
    default:"light"
})