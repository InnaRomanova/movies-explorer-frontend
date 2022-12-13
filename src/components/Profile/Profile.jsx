import React from "react";
import { useState } from "react";
import './Profile.css';


function Profile() {
    const [isEdit, setIsEdit] = useState(false);

    function handleEdit() {
        setIsEdit((evt) => !evt)
    }
    function handleExit(event) {
        event.preventDefault()
    }
    return (
        <section className="profile">
            <h3 className="profile__title">Привет, Инна!</h3>
            <form className="profile__form">
                <label className="profile__label">Имя
                    <input className="profile__input" name="name" type="text"
                        minlength="2" maxlength="30" required /></label>
                <div className="profile__border"></div>
                <label className="profile__label">E-mail
                    <input className="profile__input" name="E-mail" type="E-mail"
                        required /></label>
                <button className="profile__edit" type="submit" onClick={handleEdit}>Редактировать</button>
                <button className="profile__logout" onClick={handleExit}>Выйти из аккаунта</button>
            </form>
        </section>
    );
}

export default Profile;