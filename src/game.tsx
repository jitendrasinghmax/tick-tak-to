import { useRecoilValue } from "recoil"
import { Board } from "./componets/board"
import { canSelectAtom } from "./store/board"
import { Loader } from "./componets/loader";
export const Game = () => {
    const canSelect=useRecoilValue(canSelectAtom);
   
    console.log(canSelect)
    return (<>
        <div className="h-fit w-fit flex flex-col gap-y-3">
        {canSelect===true?<div className="h-10 w-full bg-gray-600 text-3xl text-gray-200 font-extrabold text-center">Your Turn</div>:<Loader/>}
        <div className="h-[300px] sm:h-[500px] w-[300px] sm:w-[500px]">
            <Board />
        </div>
        </div>
    </>
    )
}