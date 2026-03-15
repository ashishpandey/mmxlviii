export type Cell = number | null;
export type Row = [Cell, Cell, Cell, Cell];

export type GameData = [Row, Row, Row, Row];

export type ShiftDirection = 'left' | 'right' | 'up' | 'down';
export type GameState = 'playing' | 'gameover' | 'win';
