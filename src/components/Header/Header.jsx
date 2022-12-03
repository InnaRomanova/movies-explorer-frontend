import React from 'react';
import './Header.css';
import Logo from '../../images/logo.svg';

function Header() {
    return (
        <>
        <header className="header">
            <img className="header__logo" src={Logo} alt="Логотип" />
            <div className="header__container">
                <button className="header__registr">Регистрация</button>
                <button className="header__login">Войти</button>
            </div>
        </header>
</>
);
}

export default Header;