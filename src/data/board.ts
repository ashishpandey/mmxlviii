import { shiftRowLeft, type Cell, type Row } from "./row";

export type GameData = [Row, Row, Row, Row];

const initTile = (): Cell => Math.random() < 0.33 ? 2 : null;

export const initBoard = (): GameData => [
  [initTile(), initTile(), initTile(), initTile()],
  [initTile(), initTile(), initTile(), initTile()],
  [initTile(), initTile(), initTile(), initTile()],
  [initTile(), initTile(), initTile(), initTile()],
];

export const shiftLeft = (grid: GameData): GameData => {
  return grid.map(shiftRowLeft) as GameData;
}

const reverseGrid = (grid: GameData): GameData => {
  return grid.map(row => [...row].reverse() as Row) as GameData;
}

export const shiftRight = (grid: GameData): GameData => {
  return reverseGrid(shiftLeft(reverseGrid(grid)));
}

export const transposeGrid = (grid: GameData): GameData => {
  const newGrid: GameData = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ];
  for(let i=0; i<4; i++) {
    for(let j=0; j<4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  
  return newGrid;
}

export const shiftUp = (grid: GameData): GameData => {
  return transposeGrid(shiftLeft(transposeGrid(grid)));
}

export const shiftDown = (grid: GameData): GameData => {
  return transposeGrid(shiftRight(transposeGrid(grid)));
}

export const nextNumGenerator = (): number => Math.random() < 0.5 ? 4 : 2;

export const seedEmptyNumber = (grid: GameData, getNextNumber: () => number): GameData => {
  const numEmptyCells = grid.flat().filter(cell => cell === null).length;
  if(numEmptyCells === 0) return grid;

  const chosenIndex = Math.floor(Math.random() * numEmptyCells);
  let seenIndex = 0;
  const newGrid: GameData = grid.map(row => row.map(cell => {
    if(cell === null) {
      if(seenIndex === chosenIndex) {
        seenIndex++;
        return getNextNumber();
      }
      seenIndex++;
    }
    return cell;
  }) as Row) as GameData;

  return newGrid;
}

