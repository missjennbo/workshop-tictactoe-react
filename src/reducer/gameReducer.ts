import {Board, Cell, Player} from '../components/types';
import {getInitialBoard} from '../components/Game/initialBoard';
import {Action} from 'redux';
import {CELL_CLICKED, RESET_GAME} from '../actions/gameActions';
import {getNextBoard, getNextPlayer, isGameFinished} from '../logic/game';
import {clone} from 'ramda';

export interface GameState {
    board: Board;
    gameFinished: boolean;
    currentPlayer: Player;
}

const INITIAL_STATE: GameState = {
    board: getInitialBoard(),
    gameFinished: false,
    currentPlayer: Player.heart,
};

export interface GameAction extends Action {
    clickedCell?: Cell;
}

const updateGame = (currentState: GameState, action: GameAction): GameState => {
    if (currentState.gameFinished) {
        return currentState;
    }
    if (action.clickedCell == undefined) {
        return currentState;
    }
    return {
        board: getNextBoard(
            currentState.board,
            action.clickedCell,
            currentState.gameFinished,
            currentState.currentPlayer
        ),
        gameFinished: isGameFinished(currentState.board, currentState.currentPlayer),
        currentPlayer: getNextPlayer(currentState.currentPlayer),
    };
};

const gameReducer = (state: GameState = INITIAL_STATE, action: GameAction): GameState => {
    const currentState = clone(state);
    switch (action.type) {
        case CELL_CLICKED:
            return {
                ...updateGame(currentState, action),
            };
        case RESET_GAME:
            return {
                ...INITIAL_STATE,
            };
        default:
            return state;
    }
};

export default gameReducer;
