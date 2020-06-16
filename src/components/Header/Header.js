import * as React from 'react';
import logo from './logo.svg';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="logo" />
        </header>
    );
};
