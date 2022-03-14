/* eslint-disable default-case */
import actionTypes from './gameActionTypes';

export const gameState = {
    userHand: '',
    compHand: '',
    result: '',
    score: 0,
};

export function gameReducer(gameState, action) {
    switch (action.type) {
        case actionTypes.RESET:
            return {
                ...gameState,
                userHand: '',
                compHand: '',
                result: '',
            };

        case actionTypes.SET_USER_HAND:
            return {
                ...gameState,
                userHand: action.userHand,
            };

        case actionTypes.SET_COMP_HAND:
            return {
                ...gameState,
                compHand: action.compHand,
            };

        case actionTypes.SET_RESULT:
            let result = '';
            switch (gameState.userHand) {
                case gameState.compHand:
                    result = 'draw';
                    break;

                case 'rock':
                    result = gameState.compHand === 'paper' ? 'lose' : 'win';
                    break;

                case 'paper':
                    result = gameState.compHand === 'scissors' ? 'lose' : 'win';
                    break;

                case 'scissors':
                    result = gameState.compHand === 'rock' ? 'lose' : 'win';
                    break;
            }

            return {
                ...gameState,
                result,
            };

        case actionTypes.SET_SCORE:
            const score = parseInt(localStorage.getItem('score')) || 0;
            if (!score) localStorage.setItem('score', 0);
            return {
                ...gameState,
                score,
            };

        case actionTypes.INCREMENT_SCORE: {
            const newScore = gameState.score + 1;
            localStorage.setItem('score', newScore);
            return {
                ...gameState,
                score: newScore,
            };
        }

        case actionTypes.DECREMENT_SCORE: {
            const newScore = gameState.score > 0 ? gameState.score - 1 : 0;
            localStorage.setItem('score', newScore);
            return {
                ...gameState,
                score: newScore,
            };
        }
    }
}
