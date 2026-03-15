import { test, expect } from '@playwright/experimental-ct-react';
import type { GameData } from '../../src/data/board';
import { TestBoard } from '../test/TestBoard';
import { readGrid } from '../test/board_util';

test('can shift left', async ({ mount }) => {
  const grid: GameData = [
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2]
  ];

  const board = await mount(<TestBoard grid={grid} />);

  await board.press('ArrowLeft');

  await expect(async () => {
    const grid = await readGrid(board);

    // verify the shifted values are correct
    expect(grid[0][0]).toBe(8);
    expect(grid[0][1]).toBe(4);

    expect(grid[1][0]).toBe(4);
    expect(grid[1][1]).toBe(4);

    expect(grid[3][0]).toBe(2);

    // verify there is exactly one cell filled from nulls and its either 2 or 4
    const expectedEmptyCells = [
      [0, 2], [0, 3],
      [1, 2], [1, 3],
      [2, 0], [2, 1], [2, 2], [2, 3],
      [3, 1], [3, 2], [3, 3]
    ].map(([r, c]) => grid[r][c]);

    const filledCells = expectedEmptyCells.filter(cell => cell !== null);
    expect(filledCells).toHaveLength(1);
    expect(filledCells[0] === 2 || filledCells[0] === 4).toBeTruthy();

  }).toPass();
});