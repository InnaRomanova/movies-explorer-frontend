import React from "react";
import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__text">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект
                    и его создателя.</p>
                    <button className="promo__info">Узнать больше</button>
                </div>
                
                <img className="promo__landingLogo" src={landingLogo} alt="Логотип" />
                
            </div>
        </section>
    );
}

export default Promo;