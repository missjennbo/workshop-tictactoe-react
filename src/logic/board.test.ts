import {hasThreeDiagonal, hasThreeInColumn, hasThreeInRow} from './board';
import {Board, Player} from '../components/types';
import {getInitialBoard} from '../components/Game/initialBoard';

const getBoardWithFilledRow = (rowIndex: number, player: Player): Board => {
    const boardData = getInitialBoard();
    boardData[rowIndex][0].filledWith = player;
    boardData[rowIndex][1].filledWith = player;
    boardData[rowIndex][2].filledWith = player;
    return boardData;
};

const getBoardWithFilledColumn = (columnIndex: number, player: Player): Board => {
    const boardData = getInitialBoard();
    boardData[0][columnIndex].filledWith = player;
    boardData[1][columnIndex].filledWith = player;
    boardData[2][columnIndex].filledWith = player;
    return boardData;
};

describe('board', () => {
    describe('hasThreeInRow', () => {
        it('should be false for empty board', () => {
            expect(hasThreeInRow(getInitialBoard(), Player.heart)).toBeFalsy();
            expect(hasThreeInRow(getInitialBoard(), Player.cross)).toBeFalsy();
        });
        it('should have three in row for player heart', () => {
            const firstRowFilledWithHeart = getBoardWithFilledRow(0, Player.heart);
            expect(hasThreeInRow(firstRowFilledWithHeart, Player.heart)).toBeTruthy();
            expect(hasThreeInRow(firstRowFilledWithHeart, Player.cross)).toBeFalsy();
        });
        it('should have three in row for player cross', () => {
            const secondRowFilledWithCross = getBoardWithFilledRow(1, Player.cross);
            expect(hasThreeInRow(secondRowFilledWithCross, Player.cross)).toBeTruthy();
            expect(hasThreeInRow(secondRowFilledWithCross, Player.heart)).toBeFalsy();
        });
    });

    describe('hasThreeInColumn', () => {
        it('should be false for empty board', () => {
            expect(hasThreeInColumn(getInitialBoard(), Player.heart)).toBeFalsy();
            expect(hasThreeInColumn(getInitialBoard(), Player.cross)).toBeFalsy();
        });
        it('should have three in column for player heart', () => {
            const firstColumnFilledWithHeart = getBoardWithFilledColumn(0, Player.heart);
            expect(hasThreeInColumn(firstColumnFilledWithHeart, Player.heart)).toBeTruthy();
            expect(hasThreeInColumn(firstColumnFilledWithHeart, Player.cross)).toBeFalsy();
        });
        it('should should have three in column for player cross', () => {
            const secondColumnFilledWithCross = getBoardWithFilledColumn(1, Player.cross);
            expect(hasThreeInColumn(secondColumnFilledWithCross, Player.cross)).toBeTruthy();
            expect(hasThreeInColumn(secondColumnFilledWithCross, Player.heart)).toBeFalsy();
        });
    });

    describe('hasThreeInDiagonal', () => {
        it('should be false for empty board', () => {
            expect(hasThreeDiagonal(getInitialBoard(), Player.heart)).toBeFalsy();
            expect(hasThreeDiagonal(getInitialBoard(), Player.cross)).toBeFalsy();
        });
        it('should have three in diagonal for heart', () => {
            const board = getInitialBoard();
            board[0][0].filledWith = Player.heart;
            board[1][1].filledWith = Player.heart;
            board[2][2].filledWith = Player.heart;

            expect(hasThreeDiagonal(board, Player.heart)).toBeTruthy();
            expect(hasThreeDiagonal(board, Player.cross)).toBeFalsy();
        });
        it('should have three in diagonal reverse for cross', () => {
            const board = getInitialBoard();
            board[2][0].filledWith = Player.cross;
            board[1][1].filledWith = Player.cross;
            board[0][2].filledWith = Player.cross;

            expect(hasThreeDiagonal(board, Player.cross)).toBeTruthy();
            expect(hasThreeDiagonal(board, Player.heart)).toBeFalsy();
        });
    });
});
