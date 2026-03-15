import { test, expect } from '@playwright/experimental-ct-react';
import { GameData } from "../../src/data/board";
import { TestBoard } from "../test/TestBoard";

test('show playable game state', async ({ mount }) => {
    const grid: GameData = [
        [2, 4, 2, 4],
        [4, 2, 2, 2],
        [4, 4, 2, 4],
        [4, 2, 4, null]
    ];

    const board = await mount(<TestBoard grid={grid} />);

    await expect(board.getByText('use arrow keys')).toBeVisible();
});

test('show game over state', async ({ mount }) => {
    const grid: GameData = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
    ];

    const board = await mount(<TestBoard grid={grid} />);

    await expect(board.getByText('Game Over')).toBeVisible();
});

test('show won game state', async ({ mount }) => {
    const grid: GameData = [
        [2, 4, 2, 4],
        [4, 2, 2, 2],
        [4, 4, 2, 4],
        [4, 2, 4, 2048]
    ];

    const board = await mount(<TestBoard grid={grid} />);

    await expect(board.getByText('Congratulations')).toBeVisible();
});
