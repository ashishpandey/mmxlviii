import { expect, type MountResult } from "@playwright/experimental-ct-react";
import type { GameData } from "../../src/data/board";
import { Cell } from "../../src/data/row";

export const gridText = (grid: GameData) => grid.flat().map(v => v ? `${v}` : '');

export const expertBoard = async (board: MountResult, grid: GameData) => {
    const tiles = board.locator('.tile');
    const tileValues = await tiles.allTextContents();
    
    expect(tileValues).toEqual(gridText(grid));
}

export const readGrid = async (board: MountResult): Promise<GameData> => {
    const tiles = board.locator('.tile');
    const tileValues = await tiles.allTextContents();
    
    const grid: Cell[][] = [[], [], [], []];
    tileValues.forEach((val, i) => {
        const row = Math.floor(i / 4);
        grid[row].push(val ? parseInt(val) : null);
    });

    return grid as GameData;
}
