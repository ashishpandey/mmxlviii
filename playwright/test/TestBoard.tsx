import type { GameData } from "../../src/board";
import { GameDataProvider } from "../../src/board/GameDataProvider";
import { Board } from "../../src/components/Board";

export const TestBoard = ({ grid }: { grid: GameData }) => {
    return (
        <GameDataProvider initialData={grid} >
            <Board />
        </GameDataProvider>
    );
};
