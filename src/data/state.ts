import { transposeGrid } from "./board";
import { isRowPlayable } from "./row";
import type { GameState, GameData } from "./types";

const isPlayable = (grid: GameData): boolean => {
    return grid.some(isRowPlayable) || transposeGrid(grid).some(isRowPlayable);
}

const isWin = (grid: GameData): boolean => {
  return grid.flat().some(cell => cell === 2048);
}

export const getGameState = (grid: GameData): GameState => {
  if(isWin(grid)) return 'win';
  if(isPlayable(grid)) return 'playing';
  return 'gameover';
}
