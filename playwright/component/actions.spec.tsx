import { test } from '@playwright/experimental-ct-react';
import type { GameData } from '../../src/data/board';
import { TestBoard } from '../test/TestBoard';
import { expertBoard } from '../test/board_util';

test('can shift left', async ({ mount }) => {
  const grid: GameData = [
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2]
  ];

  const board = await mount(<TestBoard grid={grid} />);

  await board.press('ArrowLeft');

  await expertBoard(board, [
    [8, 4, null, null],
    [4, 4, null, null],
    [null, null, null, null],
    [2, null, null, null]
  ]);
});