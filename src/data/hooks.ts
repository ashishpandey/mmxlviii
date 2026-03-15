import { createContext, useCallback, useContext, useMemo } from "react";
import { initBoard, nextNumGenerator, seedEmptyNumber, shiftDown, shiftLeft, shiftRight, shiftUp } from "./board";
import { getGameState } from "./state";
import type { GameData, GameState, ShiftDirection } from "./types";

export const GameDataContext = createContext<[GameData, (tiles: GameData) => void]>([initBoard(), () => {}]);

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
