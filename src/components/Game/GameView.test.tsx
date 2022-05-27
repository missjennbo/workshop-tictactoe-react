import React from 'react';
import {fireEvent, render, RenderResult, within} from '@testing-library/react';
import GameView from './GameView';

describe('GameView', () => {
    it('should display board', () => {
        const component = render(<GameView />);
        component.getByText('Tic Tac Toe');
        component.getByTestId('cell-0-0');
        component.getByTestId('cell-2-2');
        component.getByRole('button', {name: 'Reset'});
    });
    it('should set marker on cell click', () => {
        const component = render(<GameView />);
        const firstCell = component.getByTestId('cell-0-0');
        expect(within(firstCell).queryByRole('img')).toBeNull();
        fireEvent.click(firstCell);
        expect(within(firstCell).getByRole('img')).not.toBeNull();
        expect(within(firstCell).getByAltText('heart')).not.toBeNull();
    });
    it('should disable reset button if board is empty', () => {
        const component = render(<GameView />);
        const resetButton = component.queryByRole('button', {name: 'Reset'});
        expect(resetButton).not.toBeNull();
        expect(resetButton).toBeDisabled();
    });
    it('should disable reset button if game is finished', () => {
        const component = render(<GameView />);
        finishGame(component);
        const resetButton = component.queryByRole('button', {name: 'Reset'});
        expect(resetButton).not.toBeNull();
        expect(resetButton).toBeDisabled();
    });
    it('should reset board on reset button click', () => {
        const component = render(<GameView />);
        clickCell(component, 0, 0);
        expect(getImageOfCell(component, 0, 0)).not.toBeNull();
        fireEvent.click(component.getByRole('button', {name: 'Reset'}));
        expect(getImageOfCell(component, 0, 0)).toBeNull();
    });
    it('should display winner if game is finished', () => {
        const component = render(<GameView />);
        expect(component.queryByText('Herz hat gewonnen!')).toBeNull();
        finishGame(component);
        expect(component.queryByText('Herz hat gewonnen!')).not.toBeNull();
    });
    it('should not be able to click cell after game is finished', () => {
        const component = render(<GameView />);
        finishGame(component);
        clickCell(component, 2, 2);
        const lastCell = component.getByTestId('cell-2-2');
        expect(within(lastCell).queryByRole('img')).toBeNull();
    });

    const finishGame = (component: RenderResult): void => {
        clickCell(component, 0, 0);
        clickCell(component, 0, 1);
        clickCell(component, 1, 0);
        clickCell(component, 1, 1);
        clickCell(component, 2, 0);
    };

    const clickCell = (component: RenderResult, row: number, column: number): void => {
        fireEvent.click(component.getByTestId(`cell-${row}-${column}`));
    };

    const getImageOfCell = (component: RenderResult, row: number, column: number): HTMLElement | null =>
        within(component.getByTestId(`cell-${row}-${column}`)).queryByRole('img');
});
