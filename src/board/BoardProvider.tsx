import { createContext, useContext, useState } from "react";
import { initBoard, type Board } from ".";

const BoardContext = createContext<[Board, (board: Board) => void]>([initBoard(), () => {}]);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [ board, setBoard ] = useState(initBoard());
    
    return (
        <BoardContext.Provider value={[board, setBoard]}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => {
    return useContext(BoardContext);
};
