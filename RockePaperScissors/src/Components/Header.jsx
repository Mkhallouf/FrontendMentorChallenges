import React from 'react';
import ScoreBoard from './ScoreBoard';
import Logo from '../images/logo.svg';

const Header = () => {
    return (
        <header className="self-stretch flex items-center md:items-stretch justify-between rounded-xl p-3 md:p-6 ring-4 ring-neutral-header hover:ring-blue-500 md:mb-20">
            <div className="-mb-1">
                <img src={Logo} alt="logo" className="w-20 md:w-36" />
            </div>
            <ScoreBoard />
        </header>
    );
};

export default Header;
