import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { gameStartedAtom, metaDataAtom } from "../store/board"
import { useNavigate } from "react-router-dom"
import socket from "./socket"

export const Wating=()=>{
    const metaData=useRecoilValue(metaDataAtom);
    const setGameStarted=useSetRecoilState(gameStartedAtom)
    const navigate=useNavigate();
    useEffect(()=>{
        if(!metaData){
            navigate("/")
        }
        socket.on("start-game",()=>{
            setGameStarted(true)
            navigate("/game")
        })
    },[])
    return (<>
        <div className="text-xl text-gray-400">Wating for Player...</div>
    </>)
}