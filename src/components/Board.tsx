import { useHotkeys } from "react-hotkeys-hook";
import { shiftDown, shiftLeft, shiftRight, shiftUp } from "../data/board";
import { useBoard } from "../data/GameDataProvider";
import './board.css';
import type { Cell } from "../data/row";

export const Board = () => {
    const [board, setBoard] = useBoard();

    useHotkeys('arrowleft', () => {
        const newBoard = shiftLeft(board);
        setBoard(newBoard);
    });

    useHotkeys('arrowright', () => {
        const newBoard = shiftRight(board);
        setBoard(newBoard);
    });

    useHotkeys('arrowup', () => {
        const newBoard = shiftUp(board);
        setBoard(newBoard);
    });

    useHotkeys('arrowdown', () => {
        const newBoard = shiftDown(board);
        setBoard(newBoard);
    });

    return (
        <div className="board">
            {board.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <Tile key={j} value={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export const Tile = ({ value }: { value: Cell }) => {

    const luminosity = value ? 90 - (Math.log2(value) * 5) : 100;

    const colorStyle = {
        '--val': value,
        backgroundColor: `hsl(40, 100%, ${luminosity}%)`
    }

    return (
        <div className="tile" style={colorStyle}>
            {value}
        </div>
    );
};
