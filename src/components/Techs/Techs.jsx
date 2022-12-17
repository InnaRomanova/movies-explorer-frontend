import React from "react";
import './Techs.css';
import '../AboutProject/AboutProject.css'

function Techs() {
    return (
        <section className="techs">
            <div className="techs__container">
                <h2 className="about-project__title">Технологии</h2>
            </div>
            <div className="techs__content">
                <h2 className="techs__title">7 технологий</h2>
                <div className="techs__info">
                    <p className="about-project__text">На курсе веб-разработки мы освоили технологии,
                        которые применили в дипломном проекте.</p>
                </div>
            </div>
            <ul className="techs__list">
                <li className="techs__list-item">HTML</li>
                <li className="techs__list-item">CSS</li>
                <li className="techs__list-item">JS</li>
                <li className="techs__list-item">React</li>
                <li className="techs__list-item">Git</li>
                <li className="techs__list-item">Express.js</li>
                <li className="techs__list-item">mongoDB</li>
            </ul>
        </section>
    );
}

export default Techs;