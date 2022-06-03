import React from 'react';
import BoardView from '../Board/BoardView';
import {displayWinner} from '../../logic/game';
import styles from './GameView.module.scss';
import {Cell} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {CELL_CLICKED, RESET_GAME} from '../../actions/gameActions';
import {GameAction} from '../../reducer/gameReducer';
import {RootState} from '../../store';

const GameView = (): JSX.Element => {
    const board = useSelector((state: RootState) => state.gameReducer.board);
    const gameFinished = useSelector((state: RootState) => state.gameReducer.gameFinished);
    const currentPlayer = useSelector((state: RootState) => state.gameReducer.currentPlayer);
    const dispatch = useDispatch();

    const onCellClick = (clickedCell: Cell): GameAction => dispatch({type: CELL_CLICKED, clickedCell: clickedCell});
    const resetGame = (): GameAction => dispatch({type: RESET_GAME});

    return (
        <div className={styles['container']}>
            <p>Tic Tac Toe</p>
            <BoardView boardData={board} onClick={onCellClick} />
            {gameFinished && <p>{displayWinner(currentPlayer)} hat gewonnen!</p>}
            <button className={styles['reset-button']} onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default GameView;
