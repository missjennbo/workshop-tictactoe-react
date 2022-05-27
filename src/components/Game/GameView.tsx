import React, {useState} from 'react';
import BoardView from '../Board/BoardView';
import {getInitialBoard} from './initialBoard';
import {getNextBoard, getNextPlayer, isGameFinished} from '../../logic/game';
import styles from './GameView.module.scss';
import {Cell, Player} from '../types';
import {equals} from 'ramda';

const GameView = (): JSX.Element => {
    const [board, setBoard] = useState(getInitialBoard());
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(Player.heart);

    const onCellClick = (cell: Cell): void => {
        if (gameFinished) {
            return;
        }
        setBoard(getNextBoard(board, cell, gameFinished, currentPlayer));
        setGameFinished(isGameFinished(board, currentPlayer));
        setCurrentPlayer(getNextPlayer(currentPlayer));
    };

    const resetGame = (): void => {
        setBoard(getInitialBoard());
        setGameFinished(false);
    };

    const isDisabled = equals(board, getInitialBoard()) || gameFinished;

    const displayWinner = (player: Player): string => (player == Player.cross ? 'Herz' : 'Kreuz');

    return (
        <div className={styles['container']}>
            <p>Tic Tac Toe</p>
            <BoardView boardData={board} onClick={onCellClick} />
            {gameFinished && <p>{displayWinner(currentPlayer)} hat gewonnen!</p>}
            <button disabled={isDisabled} className={styles['reset-button']} onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default GameView;
