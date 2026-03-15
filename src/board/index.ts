
export type Cell = number | null;
type Row = [Cell, Cell, Cell, Cell];
export type GameData = [Row, Row, Row, Row];

const initTile = (): Cell => Math.random() < 0.33 ? 2 : null;

export const initBoard = (): GameData => [
  [initTile(), initTile(), initTile(), initTile()],
  [initTile(), initTile(), initTile(), initTile()],
  [initTile(), initTile(), initTile(), initTile()],
  [initTile(), initTile(), initTile(), initTile()],
];

export const shiftLeft = (grid: GameData): GameData => {
  return grid.map(shiftRow) as GameData;
}

export const shiftRow = (row: Row): Row => {
  const numsToCompress = row.filter(cell => cell !== null) as number[];
  
  const compressed = compressRow(numsToCompress);
  const newRow: Cell[] = compressed.reverse();
  const emptyCells = 4-newRow.length;
  for(let i=0; i<emptyCells; i++) {
    newRow.push(null);
  }

  return newRow as Row;
}

const compressRow = (row: number[]): number[] => {
  if(row.length === 0) return [];
  
  const compressedRow: number[] = [];
  let lastNum: number = row.pop() as number;  // we know there is at least 1
  while(row.length > 0) {    // go through the numbers
    const num: number = row.pop() as number; // we know there is at least 1
    if(num === lastNum) {
      // we have a match, so we can compress
      compressedRow.push(num * 2);
      compressedRow.push(...compressRow(row)); // compress remaining row
      return compressedRow;
    } 
    else {
      // no match, we can use lastNum and continue
      compressedRow.push(lastNum);
      lastNum = num;
    }
  }

  compressedRow.push(lastNum);
  return compressedRow;
}