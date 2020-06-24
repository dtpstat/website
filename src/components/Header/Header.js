import * as React from 'react';
import logo from './logo.svg';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <a href="/">
                <img src={logo} alt="logo" width="171px" height="23px" />
            </a>
            <div className="header-menu-items">
                <a href="research" className="header-menu-item">
                    Исследования
                </a>
                <a href="download" className="header-menu-item">
                    Скачать данные
                </a>
                <a href="about" className="header-menu-item">
                    О проекте
                </a>
                <a href="support" className="header-menu-button">
                    Поддержать проект
                </a>
            </div>
        </header>
    );
};
