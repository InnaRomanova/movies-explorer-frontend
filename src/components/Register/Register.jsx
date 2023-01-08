import React from "react";
import './Register.css';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { isEmailValid, isNameValid, isPasswordValid, isEpmtyValid } from '../../utils/validate';
import { useState } from "react";
import { useEffect } from "react";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isEpmty, setIsEpmty] = useState(false);

    useEffect(() => {
        isEmailValid(email) ? setIsValidEmail(true) : setIsValidEmail(false);
        isNameValid(name) ? setIsValidName(true) : setIsValidName(false);
        isPasswordValid(password) ? setIsValidPassword(true) : setIsValidPassword(false);
        isEpmtyValid({ email, name, password }) ? setIsEpmty(true) : setIsEpmty(false);
    }, [email, name, password])

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ name, email, password })
    }
    return (
        <div className="register">
            <Link to="/">
                <img className="register__logo" src={Logo} alt="Логотип" /></Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="form__container" onSubmit={handleSubmit}>
                <label className="form__label">Имя
                    <input className="form__input"
                        value={name || ''}
                        onChange={((event) => { setName(event.target.value) })}
                        required />
                    <span className={isValidName ? "form__span_hidden" : "form__span"}>Что-то пошло не так ...</span>
                </label>
                <label className="form__label">E-mail
                    <input className="form__input"
                        value={email || ''}
                        onChange={((event) => { setEmail(event.target.value) })}
                        required />
                    <span className={isValidEmail ? "form__span_hidden" : "form__span"}>Что-то пошло не так ...</span>
                </label>
                <label className="form__label">Пароль
                    <input className="form__input"
                        type="password"
                        value={password || ''}
                        onChange={((event) => { setPassword(event.target.value) })}
                        required />
                    <span className={isValidPassword ? "form__span_hidden" : "form__span"}>Что-то пошло не так ...</span>
                </label>

                {(isValidEmail && isValidName && isValidPassword && isEpmty) ? (<button className="form__button-submit"
                    type="submit">Зарегистрироваться</button>) : (<button className="form__button-submit_inactive" disabled>Зарегистрироваться</button>)}
                <div className="form__text">Уже зарегистрированы? <Link to="/signin" className="form__enter">Войти</Link></div>
            </form>
        </div>
    );
}

export default Register;