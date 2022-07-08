import {getNextBoard, getNextPlayer, isGameFinished} from './game';
import {Player} from '../components/types';
import {hasThreeDiagonal, hasThreeInColumn, hasThreeInRow} from './board';
import {getInitialBoard} from '../components/Game/initialBoard';

jest.mock('./board');

describe('game', () => {
    describe('getNextPlayer', () => {
        it('should return cross for heart', () => {
            expect(getNextPlayer(Player.heart)).toEqual(Player.cross);
        });
        it('should return heart for cross', () => {
            expect(getNextPlayer(Player.cross)).toEqual(Player.heart);
        });
    });

    describe('getNextBoard', () => {
        const testCell = {row: 1, column: 1, filledWith: Player.none};

        it('should not modify board if game is finished', () => {
            expect(getNextBoard(getInitialBoard(), testCell, true, Player.heart)).toEqual(getInitialBoard());
        });
        it('should return current board if cell is marked', () => {
            const testBoard = getInitialBoard();
            testBoard[1][1].filledWith = Player.heart;
            expect(getNextBoard(testBoard, testCell, false, Player.cross)).toEqual(testBoard);
        });
        it('should set player for clicked cell if cell does exist and not marked', () => {
            const nextBoard = getNextBoard(getInitialBoard(), testCell, false, Player.heart);
            expect(nextBoard[1][1].filledWith).toEqual(Player.heart);
        });
    });

    describe('isGameFinished', () => {
        it('should be false', () => {
            (hasThreeInRow as jest.Mock).mockReturnValue(false);
            (hasThreeInColumn as jest.Mock).mockReturnValue(false);
            (hasThreeDiagonal as jest.Mock).mockReturnValue(false);

            const board = getInitialBoard();
            const isFinished = isGameFinished(board, Player.heart);

            expect(isFinished).toBeFalsy();
            expect(hasThreeInRow).toHaveBeenCalledWith(board, Player.heart);
            expect(hasThreeInRow).toHaveBeenCalledTimes(1);
            expect(hasThreeInColumn).toHaveBeenCalledWith(board, Player.heart);
            expect(hasThreeInColumn).toHaveBeenCalledTimes(1);
            expect(hasThreeDiagonal).toHaveBeenCalledWith(board, Player.heart);
            expect(hasThreeDiagonal).toHaveBeenCalledTimes(1);
        });

        it('should be true', () => {
            (hasThreeInRow as jest.Mock).mockReturnValue(true);
            (hasThreeInColumn as jest.Mock).mockReturnValue(false);
            (hasThreeDiagonal as jest.Mock).mockReturnValue(false);

            const board = getInitialBoard();
            const isFinished = isGameFinished(board, Player.cross);
            expect(isFinished).toBeTruthy();
            expect(hasThreeInRow).toHaveBeenCalledTimes(1);
            expect(hasThreeInRow).toHaveBeenCalledWith(board, Player.cross);
        });
    });
});
