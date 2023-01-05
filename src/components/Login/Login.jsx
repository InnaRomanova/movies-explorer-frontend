import React, { useState } from "react";
import './Login.css';
import '../Register/Register.css';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { isEmailValid, isPasswordValid, isEpmtyValid } from "../../utils/validate";

function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isEpmty, setIsEpmty] = useState(false);

    useEffect(() => {
        isEmailValid(email) ? setIsValidEmail(true) : setIsValidEmail(false);
        isPasswordValid(password) ? setIsValidPassword(true) : setIsValidPassword(false);
        isEpmtyValid({email, password}) ? setIsEpmty(true) : setIsEpmty(false);
    }, [email, password])

    //аутентификация
    function handleSubmit(e) {
        e.preventDefault();
        onLogin({email, password})
    }

    return (
        <div className="register">
            <Link to="/">
        <img className="register__logo" src={Logo} alt="Логотип" /></Link>
        <h2 className="register__title">Рады видеть!</h2>
        <form className="form__container">
            <label className="form__label">E-mail
                <input className="form__input" value={email} onChange={((event) => { setEmail(event.target.value) })} required/>
                <span className={isValidEmail ? "form__span_hidden" : "form__span"}>Что-то пошло не так ...</span>
            </label>
            <label className="form__label">Пароль
                <input className="form__input" value={password} onChange={((event) => { setPassword(event.target.value) })} required/>
                <span className={isValidPassword ? "form__span_hidden" : "form__span"}>Что-то пошло не так ...</span>
            </label>
            <div className="form__buttom-container">
                {(isValidEmail && isValidPassword && isEpmty) ? 
                <button className="form__button-submit" type="submit" onClick={handleSubmit}>Войти</button>                
                : <button className="form__button-submit_inactive" disabled>Войти</button>}
            
            <div className="form__text">Ещё не зарегистрированы? <Link to="/signup" className="form__enter">Регистрация</Link></div></div>
        </form>
    </div>
    );
}

export default Login;