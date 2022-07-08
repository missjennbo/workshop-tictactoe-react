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
            {props.boardData.map((row: Cell[], index: number) => {
                return (
                    <div key={index} className={styles.row}>
                        <CellView key={`${index}0`} onClick={props.onClick} cell={row[0]} />
                        <CellView key={`${index}1`} onClick={props.onClick} cell={row[1]} />
                        <CellView key={`${index}2`} onClick={props.onClick} cell={row[2]} />
                    </div>
                );
            })}
        </div>
    );
};

export default BoardView;
