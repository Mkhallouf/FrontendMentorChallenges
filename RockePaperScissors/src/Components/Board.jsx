/* eslint-disable default-case */
import React, { useEffect } from 'react';
import Triangle from '../images/bg-triangle.svg';
import SelectHand from './Hand';

import { useGameContext } from '../store/GameProvider';
import ResultDisplay from './EndPage';
import actionTypes from '../store/gameActionTypes';

const GameBoard = () => {
    const [{ userHand, compHand, result }, dispatch] = useGameContext();

    function setUserHand(Hand) {
        dispatch({
            type: actionTypes.SET_USER_HAND,
            userHand: Hand,
        });

        setTimeout(() => {
            setCompHand();
        }, 600);
    }

    function setCompHand() {
        const random = Math.floor(Math.random() * 3);

        let Hand = '';
        switch (random) {
            case 0:
                Hand = 'rock';
                break;
            case 1:
                Hand = 'paper';
                break;
            case 2:
                Hand = 'scissors';
                break;
        }

        dispatch({
            type: actionTypes.SET_COMP_HAND,
            compHand: Hand,
        });

        dispatch({
            type: actionTypes.SET_RESULT,
        });
    }

    function resetGame() {
        dispatch({
            type: actionTypes.RESET,
        });
    }

    useEffect(() => {
        if (!result) return;
        switch (result) {
            case 'win':
                dispatch({ type: actionTypes.INCREMENT_SCORE });
                break;
            case 'lose':
                dispatch({ type: actionTypes.DECREMENT_SCORE });
                break;
        }
    }, [result]);

    if (!userHand) {
        return (
            <div className="relative">
                <div className="transform scale-[0.6] md:scale-[0.8]">
                    <img src={Triangle} alt="triangle" />
                </div>
                <SelectHand
                    Hand="paper"
                    onClick={() => setUserHand('paper')}
                    className="cursor-pointer absolute top-0 left-0 md:-top-8 md:-left-8"
                />
                <SelectHand
                    Hand="scissors"
                    onClick={() => setUserHand('scissors')}
                    className="cursor-pointer absolute top-0 right-0 md:-top-8 md:-right-8"
                />
                <SelectHand
                    Hand="rock"
                    onClick={() => setUserHand('rock')}
                    className="cursor-pointer absolute bottom-0 md:-bottom-8 left-1/2 transform -translate-x-1/2"
                />
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Hand display */}
            <div className="flex justify-between md:items-center md:justify-center md:space-x-52 ">
                <div
                    className={`flex flex-col items-center ${
                        result ? 'md:translate-x-20' : ''
                    }`}
                >
                    <SelectHand
                        Hand={userHand}
                        className={`md:order-2 md:scale-[1.7] ${
                            result === 'win' ? 'shadow-shading' : ''
                        }`}
                    />
                    <p className="uppercase text-sm whitespace-nowrap tracking-wide md:text-xl md:order-1 mt-5 md:mt-0 md:mb-20">
                        you picked
                    </p>
                </div>
                <ResultDisplay
                    result={result}
                    resetGame={resetGame}
                    className={`hidden translate-y-10 ${
                        result ? 'md:block' : ''
                    }`}
                />
                <div
                    className={`flex flex-col items-center ${
                        result ? 'md:-translate-x-20' : ''
                    }`}
                >
                    <SelectHand
                        Hand={compHand}
                        className={`md:order-2 md:scale-[1.7] ${
                            result === 'lose' ? 'shadow-shading' : ''
                        }`}
                    />
                    <p className="uppercase whitespace-nowrap text-sm tracking-wide md:text-xl md:order-1 mt-5 md:mt-0 md:mb-20">
                        the house picked
                    </p>
                </div>
            </div>

            <ResultDisplay
                result={result}
                resetGame={resetGame}
                className={`mt-8 md:hidden ${
                    result
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
            />
        </div>
    );
};

export default GameBoard;
