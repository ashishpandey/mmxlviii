
export type Cell = number | null;
type Row = [Cell, Cell, Cell, Cell];
export type Board = [Row, Row, Row, Row];

const initCell = (): Cell => Math.random() < 0.33 ? 2 : null;

export const initBoard = (): Board => [
  [initCell(), initCell(), initCell(), initCell()],
  [initCell(), initCell(), initCell(), initCell()],
  [initCell(), initCell(), initCell(), initCell()],
  [initCell(), initCell(), initCell(), initCell()],
];
