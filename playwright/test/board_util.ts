import { expect, type MountResult } from "@playwright/experimental-ct-react";
import type { GameData } from "../board";

export const gridText = (grid: GameData) => grid.flat().map(v => v ? `${v}` : '');

export const expertBoard = async (board: MountResult, grid: GameData) => {
    const tiles = board.locator('.tile');
    const tileValues = await tiles.allTextContents();
    
    expect(tileValues).toEqual(gridText(grid));
}