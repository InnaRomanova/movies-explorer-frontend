import React from 'react';
import './Header.css';
import Logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import account from '../../images/account.svg';
import menu from '../../images/burger-menu.svg';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

function Header() {
    const location = useLocation().pathname;
    const logginIn = location === '/';
    const [openModal, setOpenModal] = useState(false);

    function handleOpen() {
        setOpenModal(true);
    }

    function handleClose() {
        setOpenModal(false);
    }

    return (
        <>
            {!logginIn ? (<header className="header__loggined">
                <Link to="/" className="header__logo-icon">
                <img  src={Logo} alt="Логотип" /></Link>
                <div className="header__container-movies">
                    <Link className="header__link-movies" to="/movies">Фильмы</Link>
                    <Link className="header__link-saved" to="/saved-movies">Сохранённые фильмы</Link> </div>
                <div className="header__container-account">
                    <Link className="header__account" to="/profile">Аккаунт
                        <img className="header__account-image" src={account} alt="Аккаунт" />
                    </Link>
                    <button className="header__account-burger" onClick={handleOpen}>
                        <img src={menu} alt="меню" />
                    </button>
                </div>
                {openModal ? <Navigation handleClose={handleClose} /> : ''}
            </header>) : (<header className="header">
                <Link to="/" className="header__logo">
                <img  src={Logo} alt="Логотип" /></Link>
                <div className="header__container">
                    <Link to="/signup" className="header__registr">Регистрация</Link>
                    <Link to="/signin" className="header__login">Войти</Link>
                </div>
            </header>)}
        </>
    );
}

export default Header;