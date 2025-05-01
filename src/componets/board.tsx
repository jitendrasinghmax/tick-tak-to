import { useRecoilState, useRecoilValue } from "recoil"
import { canSelectAtom, gameStartedAtom, matrixAtom, metaDataAtom } from "../store/board"
import Square from "./square";

import { useEffect, useState } from "react";
import socket from "./socket";
import { useNavigate } from "react-router-dom";
export const Board = () => {
    const [board,setBoard] = useRecoilState(matrixAtom);
    const gameStarted=useRecoilValue(gameStartedAtom)
    const metaData=useRecoilValue(metaDataAtom);
    const [canSelect,setCanSelect]=useRecoilState(canSelectAtom)
    const [winner,setWinner]=useState<{symbol:string}|null>(null);
    const navigate=useNavigate();
    const resethandeler=()=>{
        socket.emit('play-again',{roomId:metaData?.roomId})
    }

    useEffect(()=>{
        if(!gameStarted){
            navigate("/wating")
        }
        if(socket){
            socket.on("connect",()=>{
                console.log("connected")
            })
            socket.on("disconnect",()=>{
                console.log("disconnected")
            })
      
            socket.on('move-made',(data)=>{
                setBoard(data.board)
            })
            socket.on('allow',()=>{
                console.log("allow is fired")
                setCanSelect(true)
            })
            socket.on('game-winner',(data:{symbol:string})=>{
                setWinner(data)
            })
            socket.on('reset-game',(data)=>{
                setBoard(data.board)
                setWinner(null)
            })
        }
        return ()=>{
            socket?.off("disconnect")
        }
    },[])
console.log(canSelect);
    return (
        <div className="w-full h-full ">
            <div className="h-full w-full grid grid-cols-3 gap-4 relative">
                {winner&&winner.symbol?<div className="absolute h-full w-full  backdrop-blur-sm flex flex-col justify-center items-center gap-y-2">
                    <div className="text-white text-5xl font-extrabold">{winner.symbol==="draw"?"Draw":winner.symbol===metaData?.symbol?"You Win":"You Lose"} </div>
                    <button onClick={resethandeler} className={`bg-blue-400 px-2 py-1 rounded-md text-gray-100 font-bold`}>Play again</button>
                </div>:""}
                {board.map((cell, index) => {
                    return <Square id={index} value={cell} />
                })}
            </div>
        </div>
    )
}