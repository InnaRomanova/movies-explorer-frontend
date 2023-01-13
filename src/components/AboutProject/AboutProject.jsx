import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
<section className="about-project">
            <div className="about-project__container">
                <h2 className="about-project__title">О проекте</h2>
            </div>
            <div className="about-project__content">
                <div className="about-project__info">
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__text">Составление плана, работу над бэкендом, 
                        вёрстку, добавление функциональности и финальные доработки.</p>
                    
                </div>
                <div className="about-project__info">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__text">У каждого этапа был мягкий и жёсткий 
                        дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__time">
                <h3 className="about-project__time-black">1 неделя</h3>
                <h3 className="about-project__time-gray">4 недели</h3>
                <p className="about-project__time-description">Back-end</p>
                <p className="about-project__time-description">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;