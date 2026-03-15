import { describe, expect, test } from "vitest";
import { isRowPlayable, shiftRowLeft } from "./row";
import type { Row } from "./types";

const _ = null;

describe('shift row', () => {
    test('nothing to collapse', () => {
        const row = [_, 2, 8, 4] as Row;
        const shifted = shiftRowLeft(row);
        expect(shifted).toStrictEqual([2, 8, 4, _]);
    });

    test('leading collapse', () => {
        const row = [2, _, 2, 8] as Row;
        const shifted = shiftRowLeft(row);
        expect(shifted).toStrictEqual([4, 8, _, _]);
    });

    test('trailing collapse', () => {
        const row = [_, 2, 4, 4] as Row;
        const shifted = shiftRowLeft(row);
        expect(shifted).toStrictEqual([2, 8, _, _]);
    });

    test('can shift row left with triplets', () => {
        const row = [2, 2, 2, _] as Row;
        const shifted = shiftRowLeft(row);
        expect(shifted).toStrictEqual([4, 2, _, _]);
    });
});

describe('row playable status', () => {
    test('playable when empty cells', () => {
        const row = [2, _, 4, 8] as Row;
        expect(isRowPlayable(row)).toStrictEqual(true);
    });

    test('playable when collapsible cells', () => {
        const row = [2, 2, 4, 8] as Row;
        expect(isRowPlayable(row)).toStrictEqual(true);
    });
    
    test('not playable when no collapsible cells and row full', () => {
        const row = [2, 4, 2, 8] as Row;
        expect(isRowPlayable(row)).toStrictEqual(false);
    });
});
