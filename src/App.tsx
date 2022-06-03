import React from 'react';
import GameView from './components/Game/GameView';
import {Provider} from 'react-redux';
import {store} from './store';

const App = (): JSX.Element => (
    <Provider store={store}>
        <GameView />
    </Provider>
);

export default App;
