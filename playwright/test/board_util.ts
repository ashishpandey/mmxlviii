import { expect, type MountResult } from "@playwright/experimental-ct-react";
import type { GameData, Cell } from "../../src/data/types";

export const gridText = (grid: GameData) => grid.flat().map((v: Cell) => v ? `${v}` : '');

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
