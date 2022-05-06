import React from 'react';
import {Board, Cell} from '../types';
import styles from './BoardView.module.scss';
import CellView from '../Cell/CellView';

interface Props {
    boardData: Board;
    onClick: (cell: Cell) => void;
}

const BoardView = (props: Props): JSX.Element => {
    return (
        <div>
            {props.boardData.map((row: Cell[]) => {
                return (
                    <div key={props.boardData.indexOf(row)} className={styles['row']}>
                        <CellView key={`${props.boardData.indexOf(row)}0`} onClick={props.onClick} cell={row[0]} />
                        <CellView key={`${props.boardData.indexOf(row)}1`} onClick={props.onClick} cell={row[1]} />
                        <CellView key={`${props.boardData.indexOf(row)}2`} onClick={props.onClick} cell={row[2]} />
                    </div>
                );
            })}
        </div>
    );
};

export default BoardView;
