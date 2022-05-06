export enum Player {
    heart,
    cross,
    none,
}

export type Board = Cell[][];

export interface Cell {
    filledWith: Player;
    row: number;
    column: number;
}
