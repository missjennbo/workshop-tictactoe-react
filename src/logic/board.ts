import {Board, Player} from '../components/types';
import {all, equals} from 'ramda';

export const hasThreeInRow = (boardData: Board, player: Player): boolean => {
    for (const row of boardData) {
        const allMarkerOfRow = row.map((r) => r.filledWith);
        const rowCompletelyMarked = all(equals(player))(allMarkerOfRow);
        if (rowCompletelyMarked) {
            return true;
        }
    }
    return false;
};

export const hasThreeInColumn = (boardData: Board, player: Player): boolean => {
    const columns = boardData[0].map((cellInfo) => [
        boardData[0][cellInfo.column],
        boardData[1][cellInfo.column],
        boardData[2][cellInfo.column],
    ]);
    for (const column of columns) {
        const allMarkerOfColumn = column.map((c) => c.filledWith);
        const columnCompletelyMarked = all(equals(player))(allMarkerOfColumn);
        if (columnCompletelyMarked) {
            return true;
        }
    }
    return false;
};

export const hasThreeDiagonal = (boardData: Board, player: Player): boolean => {
    const diagonal = [boardData[0][0].filledWith, boardData[1][1].filledWith, boardData[2][2].filledWith];
    const diagonalReverse = [boardData[2][0].filledWith, boardData[1][1].filledWith, boardData[0][2].filledWith];

    const diagonalCompletelyMarked = all(equals(player))(diagonal);
    const diagonalReverseCompletelyMarked = all(equals(player))(diagonalReverse);

    return diagonalCompletelyMarked || diagonalReverseCompletelyMarked;
};
