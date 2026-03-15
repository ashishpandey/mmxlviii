import { useHotkeys } from "react-hotkeys-hook";
import { shiftDown, shiftLeft, shiftRight, shiftUp } from "../data/board";
import { useBoard } from "../data/GameDataProvider";
import './board.css';
import type { Cell } from "../data/row";
import { useSwipeable } from "react-swipeable";
import { useCallback } from "react";

type ShiftDirection = 'left' | 'right' | 'up' | 'down';

export const Board = () => {
    const [board, setBoard] = useBoard();

    const shiftBoard = useCallback((direction: ShiftDirection) => {
        let newBoard;
        switch(direction) {
            case 'left':
                newBoard = shiftLeft(board);
                break;
            case 'right':
                newBoard = shiftRight(board);
                break;
            case 'up':
                newBoard = shiftUp(board);
                break;
            case 'down':
                newBoard = shiftDown(board);
                break;
        }
        setBoard(newBoard as any);
    }, [board, setBoard]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => shiftBoard('left'),
        onSwipedRight: () => shiftBoard('right'),
        onSwipedUp: () => shiftBoard('up'),
        onSwipedDown: () => shiftBoard('down'),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    useHotkeys('arrowleft', () => shiftBoard('left'));
    useHotkeys('arrowright', () => shiftBoard('right'));
    useHotkeys('arrowup', () => shiftBoard('up'));
    useHotkeys('arrowdown', () => shiftBoard('down'));

    return (
        <div className="board" {...swipeHandlers}>
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
