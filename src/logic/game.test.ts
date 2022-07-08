import {getNextPlayer, isGameFinished} from './game';
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
        // TODO
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
