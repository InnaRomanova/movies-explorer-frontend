import React from "react";
import './Profile.css';


function Profile() {
    return (
        <section className="profile">
           <h3 className="profile__title">Привет, Инна!</h3>
           <form className="profile__form">
            <input className="profile__input" placeholder="Имя" name="name" type="text"
            minlength="2" maxlength="30" required />
            <div className="profile__border"></div>
            <input className="profile__input" placeholder="E-mail" name="E-mail" type="E-mail"
             required />
             <button className="profile__edit" type="submit">Редактировать</button>
             <button className="profile__logout">Выйти из аккаунта</button>
           </form>
        </section>
    );
}

export default Profile;