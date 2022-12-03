import React from "react";
import './Portfolio.css';
import arrow from '../../images/potrfolio.svg';


function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <nav className="portfolio__list">
                <a
                    href="https://github.com/InnaRomanova/how-to-learn"
                    className="portfolio__link portfolio__link-border"
                    target="_blank"
                    rel="noreferrer">
                    <p className="portfolio__text">Статичный сайт</p>
                    <img className="portfolio__arrow" src={arrow} alt="стрелка" />
                </a>
                <a
                    href="https://innaromanova.github.io/russian-travel/"
                    className="portfolio__link portfolio__link-border"
                    target="_blank"
                    rel="noreferrer">
                    <p className="portfolio__text">Адаптивый сайт</p>
                    <img className="portfolio__arrow" src={arrow} alt="стрелка" />
                </a>
                <a
                    href="https://inna.domainname.student.nomoredomains.icu/#/sign-in"
                    className="portfolio__link portfolio__link-border"
                    target="_blank"
                    rel="noreferrer">
                    <p className="portfolio__text">Одностраничное приложение</p>
                    <img className="portfolio__arrow" src={arrow} alt="стрелка" />
                </a>
            </nav>

        </section >
    );
}

export default Portfolio;