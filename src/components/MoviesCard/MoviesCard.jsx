import React from "react";
import './MoviesCard.css';
import movies from '../../images/image-cards.png';

function MoviesCard({card, isSavedMovies}) {
    // const cardSavedButton = `${card.saved ? 'card__saved card__saved_active'
    // : 'card__saved-button'}`;
    return (
        <li className="card">
           <div className="card__container">
           <div className="card__info">
            <h2 className="card__title">
                Фильм
            </h2>
            <span className="card__time">
                1час
            </span>
            </div>      
            <button className={isSavedMovies ? "card__delete-button" : "card__saved"} />
           </div>
           <img className="card__image" alt="Фильм" src={movies} />
        </li>
    );
}

export default MoviesCard;