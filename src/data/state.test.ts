import { describe, expect, test } from "vitest";
import type { GameData } from "./board";
import { getGameState } from "./state";

const _ = null;

describe('endgame detection', () => {
    test('moves available when we have empty cells', () => {
        const board: GameData = [
            [2, 8, 2, 2],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, _, _]
        ];

        expect(getGameState(board)).toStrictEqual('playing');
    });

    test('moves available when we have adjacent cells with the same value', () => {
        const board: GameData = [
            [2, 8, 2, 2],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 8]
        ];

        expect(getGameState(board)).toStrictEqual('playing');
    });

    test('no more moves available', () => {
        const board: GameData = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];

        expect(getGameState(board)).toStrictEqual('gameover');
    });

    test('game has beeen won', () => {
        const board: GameData = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2048]
        ];

        expect(getGameState(board)).toStrictEqual('win');
    });
});