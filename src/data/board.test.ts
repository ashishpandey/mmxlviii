import { describe, test, expect } from "vitest";
import { seedEmptyNumber, shiftDown, shiftLeft, shiftRight, shiftUp, transposeGrid, type GameData } from "./board";

const _ = null;

describe('board', () => {
    test('can shift left', () => {
        const board: GameData = [
            [_, 8, 2, 2],
            [4, 2, _, 2],
            [_, _, _, _],
            [_, _, _, 2]
        ];

        const shifted = shiftLeft(board);

        expect(shifted).toStrictEqual([
            [8, 4, _, _],
            [4, 4, _, _],
            [_, _, _, _],
            [2, _, _, _]
        ]);
    });

    test('can shift right', () => {
        const board: GameData = [
            [_, 8, 2, 2],
            [4, 2, _, 2],
            [_, _, _, _],
            [_, _, _, 2]
        ];

        const shifted = shiftRight(board);

        expect(shifted).toStrictEqual([
            [_, _, 8, 4],
            [_, _, 4, 4],
            [_, _, _, _],
            [_, _, _, 2]
        ]);
    });

    test('can transpose grid', () => {
        const board: GameData = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];

        const shifted = transposeGrid(board);

        expect(shifted).toStrictEqual([
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [4, 8, 12, 16]
        ]);
    });

    test('can shift up', () => {
        const board: GameData = [
            [_, 8, 2, 2],
            [4, 2, _, 2],
            [_, _, _, _],
            [_, _, _, 2]
        ];

        const shifted =  shiftUp(board);

        expect(shifted).toStrictEqual([
            [4, 8, 2, 4],
            [_, 2, _, 2],
            [_, _, _, _],
            [_, _, _, _]
        ]);
    });

    test('can shift down', () => {
        const board: GameData = [
            [_, 8, 2, 2],
            [4, 2, _, 2],
            [_, _, _, _],
            [_, _, _, 2]
        ];

        const shifted =  shiftDown(board);

        expect(shifted).toStrictEqual([
            [_, _, _, _],
            [_, _, _, _],
            [_, 8, _, 2],
            [4, 2, 2, 4]
        ]);
    });

    describe('seeding new numbers', () => {
        test('add new number to board', () => {
            const board: GameData = [
                [2, 8, 2, 2],
                [4, 2, 4, 2],
                [2, 4, 2, 4],
                [4, 2, 4, _]
            ];

            const newBoard = seedEmptyNumber(board, () => 2);

            expect(newBoard).toStrictEqual([
                [2, 8, 2, 2],
                [4, 2, 4, 2],
                [2, 4, 2, 4],
                [4, 2, 4, 2]
            ]);
        });

        test('no changes to the board when no empty cells', () => {
            const board: GameData = [
                [2, 8, 2, 2],
                [4, 2, 4, 2],
                [2, 4, 2, 4],
                [4, 2, 4, 8]
            ];

            const newBoard = seedEmptyNumber(board, () => 2);

            expect(newBoard).toStrictEqual([
                [2, 8, 2, 2],
                [4, 2, 4, 2],
                [2, 4, 2, 4],
                [4, 2, 4, 8]
            ]);
        });
    });
});