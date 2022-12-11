import React from "react";
import './Login.css';
import '../Register/Register.css';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="register">
        <img className="register__logo" src={Logo} alt="Логотип" />
        <h2 className="register__title">Рады видеть!</h2>
        <form className="form__container">
            <label className="form__label">E-mail
                <input className="form__input" />
                <span className="form__span">Что-то пошло не так ...</span>
            </label>
            <label className="form__label">Пароль
                <input className="form__input" />
                <span className="form__span">Что-то пошло не так ...</span>
            </label>
            <div className="form__buttom-container">
            <button className="form__button-submit" type="submit">Войти</button>
            <div className="form__text">Ещё не зарегистрированы? <Link to="/sign-up" className="form__enter">Регистрация</Link></div></div>
        </form>
    </div>
    );
}

export default Login;