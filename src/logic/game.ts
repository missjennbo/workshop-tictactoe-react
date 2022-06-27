import {Board, Cell, Player} from '../components/types';
import {hasThreeDiagonal, hasThreeInColumn, hasThreeInRow} from './board';

export const getNextPlayer = (currentPlayer: Player): Player =>
    currentPlayer === Player.heart ? Player.cross : Player.heart;

const isUnmarked = (cell: Cell): boolean => cell.filledWith === Player.none;

export const getNextBoard = (board: Board, cell: Cell, gameFinished: boolean, currentPlayer: Player): Board => {
    if (gameFinished) {
        return board;
    }
    const clickedCell = board[cell.row][cell.column];
    if (isUnmarked(clickedCell)) {
        board[cell.row][cell.column].filledWith = currentPlayer;
    }
    return board;
};

export const isGameFinished = (boardData: Board, currentPlayer: Player): boolean => {
    const markerForCurrentPlayer = currentPlayer === Player.cross ? Player.cross : Player.heart;
    return (
        hasThreeInRow(boardData, markerForCurrentPlayer) ||
        hasThreeInColumn(boardData, markerForCurrentPlayer) ||
        hasThreeDiagonal(boardData, markerForCurrentPlayer)
    );
};
