import React from "react";
import './AboutMe.css';
import photo from '../../images/myPhoto.jpg';

function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-project__container">
                <h2 className="about-project__title">Студент</h2>
            </div>
            <div className="about-me__content">
                <div className="about-me__info">
                    <h2 className="about-me__title">Инна</h2>
                <p className="about-me__subtitle">Фронтенд-разработчик, 33 года</p>
                <p className="about-me__text">Я родилась в Чувашии и живу в Чебоксарах.Я люблю
                    слушать музыку, увлекаюсь чтением художественных книг, вязанием, а ещё с удовольствием
                    люблю покататься на коньках. Благодаря курсу Веб-разработчик в Яндекс Практикуме, убедилась,
                    что мне интересна разработка. Хочу развиваться в этом направлении, постоянно расширяя и углубляя
                    свои знания.</p>
                <a href="https://github.com/InnaRomanova" className="about-me__link" rel="noreferrer">
                    Github
                </a></div>
            <img src={photo} alt="фото" className="about-me__photo" />
        </div>
        </section >
    );
}

export default AboutMe;