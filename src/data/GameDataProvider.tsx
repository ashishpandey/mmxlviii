import { useState } from "react";
import { initBoard } from "./board";
import { type GameData } from "./types";
import { GameDataContext } from "./hooks";

type GameDataProviderProps = {
    children: React.ReactNode;
    initialData?: GameData;
};

export const GameDataProvider = ({ children, initialData }: GameDataProviderProps) => {
    const [ grid, setGrid ] = useState(initialData || initBoard());
    
    return (
        <GameDataContext.Provider value={[grid, setGrid]}>
            {children}
        </GameDataContext.Provider>
    );
};
