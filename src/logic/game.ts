import {Board, Cell, Player} from '../components/types';
import {hasThreeDiagonal, hasThreeInColumn, hasThreeInRow} from './board';

const isUnmarked = (cell: Cell): boolean => cell.filledWith === Player.none;

export const getNextPlayer = (currentPlayer: Player): Player =>
    currentPlayer === Player.heart ? Player.cross : Player.heart;

export const isGameFinished = (boardData: Board, currentPlayer: Player): boolean => {
    return (
        hasThreeInRow(boardData, currentPlayer) ||
        hasThreeInColumn(boardData, currentPlayer) ||
        hasThreeDiagonal(boardData, currentPlayer)
    );
};

export const getNextBoard = (board: Board, cell: Cell, gameFinished: boolean, currentPlayer: Player): Board => {
    if (gameFinished) {
        return board;
    }
    if (isUnmarked(cell)) {
        board[cell.row][cell.column].filledWith = currentPlayer;
    }
    return board;
};
