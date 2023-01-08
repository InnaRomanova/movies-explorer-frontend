import React from "react";
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__info">
                <p className="footer__author">© 2022</p>
                <div className="footer__item">
                <a
          href="https://practicum.yandex.ru"
          className="footer__link"
          target="_blank"
          rel="noreferrer">
          Яндекс.Практикум
        </a>
        <a
          href="https://github.com/InnaRomanova"
          className="footer__link"
          target="_blank"
          rel="noreferrer">
          Github
        </a>
        </div>
            </div>
        </footer>
    )
}

export default Footer;