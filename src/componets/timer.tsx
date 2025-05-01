import { useEffect, useRef, useState } from "react"

export const Timmer=()=>{
    const [width,setwidth]=useState(0);
    const ref = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(()=>{
        ref.current=setInterval(()=>{
            setwidth((prev)=>prev+1);
        },500)
        return ()=>{
            if(ref.current){
                clearInterval(ref.current)
            }
        }
    })
    return <div style={{width:(100/20)*width+"%"}} className="h-full bg-gray-200"></div>
}