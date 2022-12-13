import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/account.svg';

function Navigation({ handleClose }) {
    return (
        <div className="navigation" onClick={handleClose}>
            <div className="navigation__block">
            <button className="navigation__close-button" onClick={handleClose} />
            <div className="navigation__container">
                <Link className="navigation__link" to="/">Главная</Link>
                <Link className="navigation__link" to="/movies">Фильмы</Link>
                <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
            <Link className="navigation__account" to="/profile">Аккаунт
                <img className="header__account-image" src={account} alt="Аккаунт" /></Link>
        </div>
        </div>
    );
}

export default Navigation;