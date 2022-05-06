import React from 'react';
import {Cell, Player} from '../types';
import {crossCell, heartCell, notFilledCell} from './CellData';

interface Props {
    cell: Cell;
    onClick: (cell: Cell) => void;
}

const CellView = (props: Props): JSX.Element => {
    const cellIsUnmarked = props.cell.filledWith === Player.none;

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
        <div onClick={() => (cellIsUnmarked ? props.onClick(props.cell) : '')}>{getMarker(props.cell.filledWith)}</div>
    );
};

export default CellView;
