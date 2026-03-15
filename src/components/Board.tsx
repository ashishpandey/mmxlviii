import './board.css';
import { useHotkeys } from "react-hotkeys-hook";
import { useBoard } from "../data/GameDataProvider";
import type { Cell } from "../data/row";
import { useSwipeable } from "react-swipeable";
export const Board = () => {
    const {grid, shiftGrid} = useBoard();

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => shiftGrid('left'),
        onSwipedRight: () => shiftGrid('right'),
        onSwipedUp: () => shiftGrid('up'),
        onSwipedDown: () => shiftGrid('down'),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    useHotkeys('arrowleft', () => shiftGrid('left'));
    useHotkeys('arrowright', () => shiftGrid('right'));
    useHotkeys('arrowup', () => shiftGrid('up'));
    useHotkeys('arrowdown', () => shiftGrid('down'));

    return (
        <div className="board" {...swipeHandlers}>
            {grid.map((row, i) => (
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
