import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { canSelectAtom, metaDataAtom } from '../store/board';
import socket from './socket';

interface SquareProps {
    value: string | null;
    id:number
}

const Square: React.FC<SquareProps> = ({value,id}) => {
    const metaData=useRecoilValue(metaDataAtom);
    const [canSelect,setCanSelect]=useRecoilState(canSelectAtom);
    const handelCilck=()=>{
        if(!value&&metaData&&canSelect===true){
            const {roomId,symbol}=metaData;
            socket?.emit('make-move', {roomId,index:id,symbol})
            setCanSelect(false)
          }
        }
    
    const bgStyle = !value ?'bg-gray-500':metaData?.symbol===value ? 'bg-blue-300' : 'bg-red-300';
    return (
        <button
             onClick={handelCilck}
             className={`h-full w-full ${bgStyle}`}>
            
        </button>
    );
};

export default Square;