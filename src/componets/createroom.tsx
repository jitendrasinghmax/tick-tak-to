import { useRecoilState, useRecoilValue } from "recoil"
import { styles } from "../style"
import { themeAtom } from "../store/theme"
import socket from "./socket"
import { useEffect, useState } from "react"
import { metaDataAtom } from "../store/board"
import { useNavigate } from "react-router-dom"
export const CreateRoom = () => {
    const theme = useRecoilValue(themeAtom);
    const [metaData, setMetaData] = useRecoilState(metaDataAtom);
    const [inputRoomId,setInputroomId]=useState<string>("");
    const [InputName,setInputName]=useState<string>("");
    const navigate=useNavigate();
    const createRoomHandler = () => {
        if (socket&& inputRoomId!==""&&InputName!=="") {
            socket.emit("join-room", { roomId: inputRoomId, symbol: InputName })
        }
    }
    useEffect(()=>{
        socket.on('joined-room',(data)=>{
            setMetaData({
                roomId:data.roomId,
                symbol:data.symbol
            })
            navigate("/wating")
        })
    },[])
    return (<>
        <input
            onChange={(e)=>setInputName(e.target.value)}
            value={InputName}
            type="text"
            placeholder="Enter name"
            className={`${styles.border[theme]} ${styles.bg[theme]} border-2 rounded-md px-2 py-1 focus:outline-none text-white`}
        ></input>
        <input
            onChange={(e)=>setInputroomId(e.target.value)}
            value={inputRoomId}
            type="text"
            placeholder="Enter room id"
            className={`${styles.border[theme]} ${styles.bg[theme]} border-2 rounded-md px-2 py-1 focus:outline-none text-white`}
        ></input>
        <button 
                onClick={createRoomHandler}
                className={`${styles.button.bg[theme]} shadow-lg shadow-gray-400 rounded-md px-2 py-1
                 ${styles.button.border[theme] + " " + styles.button.text[theme]} 
                 border-2`}>Join Room</button>
        <button 
                onClick={createRoomHandler}
                className={`${styles.button.bg[theme]} shadow-lg shadow-gray-400 rounded-md px-2 py-1
                 ${styles.button.border[theme] + " " + styles.button.text[theme]} 
                 border-2`}>Create Room</button>
    </>)
}