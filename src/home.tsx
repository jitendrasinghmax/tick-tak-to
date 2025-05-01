import { useRecoilValue } from "recoil"
import { styles } from "./style"
import { themeAtom } from "./store/theme"
import { Outlet } from "react-router-dom"

export const Home=()=>{
    const theme=useRecoilValue(themeAtom)
    return <div className={`${styles.border[theme]} h-96 w-96 border-2 rounded-lg 
                                                    flex flex-col justify-center items-center gap-y-6
                                                     ${styles.bg[theme]}`}>
        <Outlet/>

    </div>
}