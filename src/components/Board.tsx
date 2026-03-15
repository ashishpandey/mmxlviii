import { useHotkeys } from "react-hotkeys-hook";
import { shiftLeft, type Cell } from "../board";
import { useBoard } from "../board/GameDataProvider";
import './board.css';

export const Board = () => {
    const [board, setBoard] = useBoard();

    console.log('rendering board', board);

    useHotkeys('arrowleft', () => {
        console.log('left', board);
        const newBoard = shiftLeft(board);
        console.log('new board', newBoard);
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
