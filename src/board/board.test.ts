import { describe, test, expect } from "vitest";
import { shiftLeft, type GameData } from ".";

describe('board', () => {
    test('can shift left', () => {
        const board: GameData = [
            [null, 8, 2, 2],
            [4, 2, null, 2],
            [null, null, null, null],
            [null, null, null, 2]
        ];

        const shifted = shiftLeft(board);

        expect(shifted).toStrictEqual([
            [8, 4, null, null],
            [4, 4, null, null],
            [null, null, null, null],
            [2, null, null, null]
        ]);
    });

    test('can shift left with triplets', () => {
        const board: GameData = [
            [2, 2, 2, null],
            [2, 2, null, 2],
            [2, null, 2, 2],
            [null, 2, 2, 2]
        ];
        const shifted = shiftLeft(board);
        expect(shifted).toStrictEqual([
            [2, 4, null, null],
            [2, 4, null, null],
            [2, 4, null, null],
            [2, 4, null, null]
        ]);
    });

});