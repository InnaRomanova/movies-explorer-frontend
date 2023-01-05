import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css';
import { useState, useEffect } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { filterMovies, filterTimeMovies } from '../../utils/utils';

function Movies({ handleSaveClick, onCardDelete, savedMovies, loggedIn }) {
    const [isMovies, setIsMovies] = useState([]);
    const [saveMovies, setSaveMovies] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
    const [isShortMovies, setIsShortMovies] = useState(false); // чекбокс короткометражек
    const [isLoading, setIsLoading] = useState(false); //загрузка
    const [isRequestError, setIsRequestError] = useState(false); //ошибка запроса
    const [initialMovies, setInitialMovies] = useState([]);

    useEffect(() => {
        if (saveMovies.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [saveMovies]);

    useEffect(() => {
        if (localStorage.getItem('shortMovies') === 'true') {
            setIsShortMovies(true);
        } else {
            setIsShortMovies(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movies')) {
          const movies = JSON.parse(localStorage.getItem('movies'));
          setInitialMovies(movies);
          if (localStorage.getItem('shortMovies') === 'true') {
            setIsMovies(filterTimeMovies(movies));
          } else {
            setIsMovies(movies);
          }
        } else {
        }
      }, []);

    function handleShortMovies() {
        setIsShortMovies(!isShortMovies);
        if (!isShortMovies) {
            if (filterTimeMovies(initialMovies).length === 0) {
                setSaveMovies(filterTimeMovies(initialMovies));
            } else {
                setSaveMovies(filterTimeMovies(initialMovies));
            }
        } else {
            setSaveMovies(initialMovies);
        }
        localStorage.setItem('shortMovies', !isShortMovies);
    }

    //функция фильтрации фильмов от массива
    function handleFilterMovies(movies, qwery, short) {
        const movieList = filterMovies(movies, qwery, short); //фильтрация массива полученного
        setSaveMovies(movieList); //запись в стейт
        setIsMovies(short ? filterTimeMovies(movieList) : movieList);
        localStorage.setItem('movies', JSON.stringify(movieList));
        localStorage.setItem('allMovies', JSON.stringify(movies));
    }

    //кнопка поиска
    function onSearchCards(qwery) {
        localStorage.setItem('movieSearch', qwery);
        localStorage.setItem('shortMovies', isShortMovies);
        if (localStorage.getItem('allMovies')) {
            const movies = JSON.parse(localStorage.getItem('allMovies'));
            handleFilterMovies(movies, qwery, isShortMovies);
        } else {
            setIsLoading(true);
            moviesApi.getMovies()
                .then((cards) => {
                    handleFilterMovies(cards, qwery, isShortMovies);
                    setIsRequestError(false);
                })
                .catch((err) => {
                    setIsRequestError(true);
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }
    
    return (
        <section className="movies">
            <Header loggedIn={loggedIn }/>
            <SearchForm
                onSearchCards={onSearchCards}
                isShortMovies={isShortMovies}
                onFilter={handleShortMovies} />
            <MoviesCardList
                cards={saveMovies}
                isNotFound={isNotFound}
                handleSaveClick={handleSaveClick}
                onCardDelete={onCardDelete}
                isRequestError={isRequestError}
                savedMovies={savedMovies}
                isLoading={isLoading}
                isSavedMovies={false} />
            <Footer />
        </section>
    );
}

export default Movies;