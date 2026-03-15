import type { GameData } from "../../src/data/board";
import { GameDataProvider } from "../../src/data/GameDataProvider";
import { Board } from "../../src/components/Board";

export const TestBoard = ({ grid }: { grid: GameData }) => {
    return (
        <GameDataProvider initialData={grid} >
            <Board />
        </GameDataProvider>
    );
};
