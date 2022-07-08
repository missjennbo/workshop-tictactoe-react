import {getNextBoard, getNextPlayer, isGameFinished} from './game';
import {Board, Player} from '../components/types';
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
        const getTestBoard = (): Board => {
            const board = getInitialBoard();
            board[1][1].filledWith = Player.heart;
            return board;
        };

        it('should not change board if game is finished', () => {
            const clickedCell = {row: 1, column: 1, filledWith: Player.none};
            const nextBoard = getNextBoard(getTestBoard(), clickedCell, true, Player.cross);
            expect(nextBoard).toEqual(getTestBoard());
        });
        it('should not change board if clicked cell is already marked', () => {
            const clickedCell = {row: 1, column: 1, filledWith: Player.heart};
            const nextBoard = getNextBoard(getTestBoard(), clickedCell, false, Player.cross);
            expect(nextBoard).toEqual(getTestBoard());
        });
        it('should return board with changed cell marker', () => {
            const clickedCell = {row: 0, column: 0, filledWith: Player.none};
            const nextBoard = getNextBoard(getTestBoard(), clickedCell, false, Player.heart);
            expect(nextBoard).not.toEqual(getTestBoard());
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
