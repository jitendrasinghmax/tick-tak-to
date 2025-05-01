import { useEffect, useState } from "react"
import { useTheme } from "./useTheme"
import { Home } from "./home"
import { styles } from "./style"
import { useRecoilState } from "recoil"
import { themeAtom } from "./store/theme"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreateRoom } from "./componets/createroom"
import { Wating } from "./componets/wating"
import { Game } from "./game"
export const Layout = () => {
    const [theme, setTheme] = useRecoilState(themeAtom)

    useEffect(() => {
        setTheme(useTheme())
    }, [])
    return (
        <div className={`${styles.bg[theme]} min-h-screen flex flex-col justify-center items-center`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="/" element={<CreateRoom />}></Route>
                        <Route path="/wating" element={<Wating />}></Route>
                    </Route>
                    <Route path="/game" element={<Game />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}