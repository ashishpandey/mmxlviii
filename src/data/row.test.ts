import { describe, expect, test } from "vitest";
import { shiftRowLeft, type Row } from "./row";

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
