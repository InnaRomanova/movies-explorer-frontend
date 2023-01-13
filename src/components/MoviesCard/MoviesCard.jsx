import React from "react";
import './MoviesCard.css';

function MoviesCard({ card, isSavedMovies, handleSaveClick, onCardDelete, saved, savedMovies }) {

    //конвертер длительности фильмов
    function durationConverterMovies(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}ч ${minutes}м`;
    }

    function onCardClick() {
        if (saved) {
            onCardDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
        } else {
            handleSaveClick(card);
        }
    }

    function onDelete() {
        onCardDelete(card);
    }

    const cardSaveButtonClassName = `${saved ? 'card__saved_active' : 'card__saved'}`;

    return (
        <li className="card">
            <div className="card__container">
                <div className="card__info">
                    <h2 className="card__title">
                        {card.nameRU}
                    </h2>
                    <span className="card__time">
                        {durationConverterMovies(card.duration)}
                    </span>
                </div>
                {isSavedMovies ? (<button className="card__delete-button" onClick={onDelete} />)
                    : (<button type="button" className={cardSaveButtonClassName} onClick={onCardClick}></button>)}
            </div>
            <a href={card.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__image" alt={card.nameRU} src={isSavedMovies ? card.image
                    : `https://api.nomoreparties.co/${card.image.url}`} /></a>
        </li>
    );
}

export default MoviesCard;