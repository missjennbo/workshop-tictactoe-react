import React from 'react';
import {Cell, Player} from '../types';
import {crossCell, heartCell, notFilledCell} from './CellData';

interface Props {
    cell: Cell;
    onClick: (cell: Cell) => void;
}

const CellView = (props: Props): JSX.Element => {
    const cellIsUnmarked = props.cell.filledWith === Player.none;
    const cellId = `cell-${props.cell.row}-${props.cell.column}`;

    const getMarker = (filledWith: Player): JSX.Element => {
        if (filledWith === Player.heart) {
            return heartCell;
        }
        if (filledWith === Player.cross) {
            return crossCell;
        }
        return notFilledCell;
    };

    return (
        <div data-testid={cellId} onClick={() => (cellIsUnmarked ? props.onClick(props.cell) : '')}>
            {getMarker(props.cell.filledWith)}
        </div>
    );
};

export default CellView;
