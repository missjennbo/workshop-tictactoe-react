import React from 'react';
import BoardView from '../Board/BoardView';
import styles from './GameView.module.scss';
import {Cell, Player} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {GameAction} from '../../reducer/gameReducer';
import {CELL_CLICKED, RESET_GAME} from '../../actions/gameActions';
import {RootState} from '../../store';

const GameView = (): JSX.Element => {
    const board = useSelector((state: RootState) => state.gameReducer.board);
    const gameFinished = useSelector((state: RootState) => state.gameReducer.gameFinished);
    const currentPlayer = useSelector((state: RootState) => state.gameReducer.currentPlayer);
    const dispatch = useDispatch();

    const onCellClick = (clickedCell: Cell): GameAction => dispatch({type: CELL_CLICKED, clickedCell: clickedCell});
    const resetGame = (): GameAction => dispatch({type: RESET_GAME});

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
