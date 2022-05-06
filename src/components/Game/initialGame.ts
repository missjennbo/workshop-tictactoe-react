import {Board, Player} from '../types';

export const initialGame: Board = [
    [
        {filledWith: Player.none, row: 0, column: 0},
        {filledWith: Player.none, row: 0, column: 1},
        {filledWith: Player.none, row: 0, column: 2},
    ],
    [
        {filledWith: Player.none, row: 1, column: 0},
        {filledWith: Player.none, row: 1, column: 1},
        {filledWith: Player.none, row: 1, column: 2},
    ],
    [
        {filledWith: Player.none, row: 2, column: 0},
        {filledWith: Player.none, row: 2, column: 1},
        {filledWith: Player.none, row: 2, column: 2},
    ],
];
