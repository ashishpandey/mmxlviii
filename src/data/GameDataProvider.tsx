import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { initBoard, nextNumGenerator, seedEmptyNumber, shiftDown, shiftLeft, shiftRight, shiftUp, type GameData } from "./board";
import { getGameState, type GameState } from "./state";

const GameDataContext = createContext<[GameData, (tiles: GameData) => void]>([initBoard(), () => {}]);

export type ShiftDirection = 'left' | 'right' | 'up' | 'down';

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
    const [grid, setGrid] = useContext(GameDataContext);

    const status: GameState = useMemo(() => {
        return getGameState(grid);
    }, [grid]);
    
    const shiftGrid = useCallback((direction: ShiftDirection) => {
        let newBoard: GameData;
        switch(direction) {
            case 'left':
                newBoard = shiftLeft(grid);
                break;
            case 'right':
                newBoard = shiftRight(grid);
                break;
            case 'up':
                newBoard = shiftUp(grid);
                break;
            case 'down':
                newBoard = shiftDown(grid);
                break;
        }
        setGrid(seedEmptyNumber(newBoard, nextNumGenerator));
    }, [grid, setGrid]);
    
    return {grid, shiftGrid, status};
};
