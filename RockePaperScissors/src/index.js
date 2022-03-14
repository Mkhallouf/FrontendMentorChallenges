import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import GameProvider from './store/GameProvider';

ReactDOM.render(
    <React.StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
