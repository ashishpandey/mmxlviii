import { createContext, useContext, useState } from "react";
import { initBoard, type GameData } from "./board";

const GameDataContext = createContext<[GameData, (tiles: GameData) => void]>([initBoard(), () => {}]);

export type GameDataProviderProps = {
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

export const useBoard = () => {
    return useContext(GameDataContext);
};
