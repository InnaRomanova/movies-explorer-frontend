import React from "react";
import './Register.css';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';


function Register() {
    return (
            <div className="register">
                <img className="register__logo" src={Logo} alt="Логотип" />
                <h2 className="register__title">Добро пожаловать!</h2>
                <form className="form__container">
                    <label className="form__label">Имя
                        <input className="form__input" required />
                        <span className="form__span">Что-то пошло не так ...</span></label>
                    <label className="form__label">E-mail
                        <input className="form__input" required />
                        <span className="form__span">Что-то пошло не так ...</span>
                    </label>
                    <label className="form__label">Пароль
                        <input className="form__input" required />
                        <span className="form__span">Что-то пошло не так ...</span>
                    </label>
                    
                    <button className="form__button-submit form__button-submit_inactive" type="submit">Зарегистрироваться</button>
                    <div className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__enter">Войти</Link></div>
                    </form>
            </div>
    );
}

export default Register;