import React from "react";
import { useState } from "react";
import './Profile.css';
import Header from '../Header/Header';
import { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { isEmailValid, isNameValid, isEpmtyValid } from '../../utils/validate';

function Profile({ onLogout, loggedIn, onUpdateProfile }) {
    let currentUser = React.useContext(CurrentUserContext);
    const [email, setEmail] = useState(false);
    const [name, setName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isEpmty, setIsEpmty] = useState(false);

    useEffect(() => {
        isEmailValid(email) ? setIsValidEmail(true) : setIsValidEmail(false);
        isNameValid(name) ? setIsValidName(true) : setIsValidName(false);
        isEpmtyValid({ email, name }) ? setIsEpmty(true) : setIsEpmty(false);
    }, [email, name])

    useEffect(() => {
        setEmail(currentUser.email);
        setName(currentUser.name);
    }, [currentUser])

    //редактировать профиль
    function handleEdit(e) {
        e.preventDefault();
        onUpdateProfile(name, email);
    }

    function isValid() {
        return (currentUser.name === name && currentUser.email === email) || !isEpmty || !(isValidEmail && isValidName);
    }

    return (
        <>
            <Header
                loggedIn={loggedIn} />
            <section className="profile">
                <h3 className="profile__title">{`Привет, ${currentUser.name || 'пользователь'}!`}</h3>
                <form className="profile__form">
                    <label className="profile__label">Имя
                        <input
                            className="profile__input"
                            name="name"
                            type="text"
                            minLength="2"
                            maxLength="30"
                            defaultValue={currentUser.name || ''}
                            onChange={((event) => { setName(event.target.value) })}
                            required />
                    </label>
                    <div className="profile__border"></div>
                    <label className="profile__label">E-mail
                        <input
                            className="profile__input"
                            name="E-mail"
                            type="E-mail"
                            defaultValue={currentUser.email || ''}
                            onChange={((event) => { setEmail(event.target.value) })}
                            required /></label>
                    <button
                        className="profile__edit"
                        type="submit"
                        onClick={handleEdit}
                        disabled={isValid()}>
                        Редактировать
                    </button>
                    <button className="profile__logout" type="button" onClick={onLogout}>Выйти из аккаунта</button>
                </form>
            </section>
        </>
    );
}

export default Profile;