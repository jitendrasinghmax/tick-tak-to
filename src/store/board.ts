import { atom, selector } from "recoil";
import { Socket } from "socket.io-client";
import socket from "../componets/socket";
const winnerCombinations:number[][]=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
export const canSelectAtom=atom<boolean>({
    key:"canSelect",
    default:false
})
export const gameStartedAtom=atom<boolean|null>({
    key:"gameStarted",
    default:null
})
export const metaDataAtom=atom<{roomId:string,symbol:string}|null>({
    key:"metaDetaAtom",
    default:null
})
export const socketAtom=atom<Socket | null>({
    key:"socket",
    default:null
})
export const matrixAtom=atom({
    key:"matrix",
    default:Array(9).fill(null)
})

export const checkWinnerSelector=selector<string|null>({
    key:"checkWinner",
    get:({get})=>{
        const matrix=get(matrixAtom)
        const metaData=get(metaDataAtom)
        const emptyCell=matrix.filter((cell)=>!cell)

       for (const row of winnerCombinations){
            
            if(matrix[row[0]]===matrix[row[1]] && matrix[row[1]]===matrix[row[2]]&& matrix[row[2]]==metaData?.symbol){
                console.log("base case hit")
                socket.emit('winner',{roomId:metaData?.roomId,symbol:metaData?.symbol})
                return null;
            }
            else if(emptyCell.length===0){
                socket.emit('winner',{roomId:metaData?.roomId,symbol:"draw"})
            }
        }
        return null;
    }
})
