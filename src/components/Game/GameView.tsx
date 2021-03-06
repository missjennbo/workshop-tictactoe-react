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
        setGameFinished(isGameFinished(board, currentPlayer));
        setCurrentPlayer(getNextPlayer(currentPlayer));
    };

    return (
        <div className={styles['container']}>
            <h1>Tic Tac Toe</h1>
            <BoardView boardData={board} onClick={onCellClick} />
        </div>
    );
};

export default GameView;
