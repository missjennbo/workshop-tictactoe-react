import React, {useState} from 'react';
import BoardView from '../Board/BoardView';
import {getInitialBoard} from './initialBoard';
import {getNextBoard, getNextPlayer, isGameFinished} from '../../logic/game';
import styles from './GameView.module.scss';
import {Cell, Player} from '../types';

const GameView = (): JSX.Element => {
    const [board, setBoard] = useState(getInitialBoard());
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(Player.heart);

    const onCellClick = (cell: Cell): void => {
        if (gameFinished) {
            return;
        }
        setBoard(getNextBoard(board, cell, gameFinished, currentPlayer));
        const isFinished = isGameFinished(board, currentPlayer);
        setGameFinished(isFinished);
        if (!isFinished) {
            setCurrentPlayer(getNextPlayer(currentPlayer));
        }
    };

    const resetGame = (): void => {
        setBoard(getInitialBoard());
        setGameFinished(false);
    };

    const currentPlayerDisplayName = currentPlayer === Player.heart ? 'Herz' : 'Kreuz';

    return (
        <div className={styles['container']}>
            <h1>Tic Tac Toe</h1>
            <BoardView boardData={board} onClick={onCellClick} />
            {gameFinished && <p>{currentPlayerDisplayName} hat gewonnen!</p>}
            {!gameFinished && <p>{currentPlayerDisplayName} ist dran!</p>}
            <button className={styles.resetBtn} onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default GameView;
