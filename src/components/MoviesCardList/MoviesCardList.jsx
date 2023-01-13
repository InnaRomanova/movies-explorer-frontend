import React from "react";
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';
import SearchError from '../SearchError/SearchError';
import { SHOW_DECKTOP, SHOW_TABLET, SHOW_MODULE } from "../../utils/constants";

function MoviesCardList({
    cards,
    isSavedMovies,
    isNotFound,
    savedMovies,
    handleSaveClick,
    onCardDelete,
    isRequestError }) {

    const [end, setEnd] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLocalStorageMovies, setIsLocalStorageMovies] = useState(false);

    useEffect(() => {
        shownCount();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            localStorage.getItem('movies') === null ? setIsLocalStorageMovies(false) : setIsLocalStorageMovies(true);
            window.addEventListener('resize', shownCount);
        }, 2000);
    });

    function shownCount() {
        const display = window.innerWidth;
        if (display > 1024) {
            setEnd(12);
        } else if (display > 520) {
            setEnd(8);
        } else if (display < 520) {
            setEnd(5);
        }
    }

    function showMore() {
        const display = window.innerWidth;
        if (display > 1024) {
            setEnd(end + SHOW_DECKTOP);
        } else if (display > 520) {
            setEnd(end + SHOW_TABLET);
        } else if (display < 520) {
            setEnd(end + SHOW_MODULE);
        }
    }

    function getSavedMovieCard(savedMovies, card) {
        return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
    }
    
    return (
        <section className="cards">
            {isLoading && <Preloader />}
            {isNotFound && !isLoading && isLocalStorageMovies && <SearchError errorText={'Ничего не найдено'} />}
            {isRequestError && !isLoading && (
                <SearchError
                    errorText={
                        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                    }
                />
            )}
            {!isLoading && !isRequestError && !isNotFound && (
                <>
                    <ul className="cards__list">
                        {cards.slice(0, end).map((card) => (
                            <MoviesCard
                                key={isSavedMovies ? card._id : card.id}
                                card={card}
                                isSavedMovies={isSavedMovies}
                                cards={cards}
                                saved={getSavedMovieCard(savedMovies, card)}
                                savedMovies={savedMovies}
                                handleSaveClick={handleSaveClick}
                                onCardDelete={onCardDelete}
                            />))}
                    </ul>
                    <div className="cards__container">
                        {cards.length > end ? (<button className="cards__still-button"
                            onClick={showMore}>Ещё</button>) : ''}
                    </div>
                </>
            )}

        </section>
    );
}

export default MoviesCardList;