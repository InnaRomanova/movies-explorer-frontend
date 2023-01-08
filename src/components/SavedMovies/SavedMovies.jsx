import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';
import { useState, useEffect } from "react";
import { filterMovies, filterTimeMovies } from '../../utils/utils';

function SavedMovies({ loggedIn, savedMovies, onCardDelete }) {
  const [searchQwery, setSearchQwery] = useState('');
  const [filterIsMovies, setFilterIsMovies] = useState(savedMovies); //фильтрация по запросу  и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false) // включение, отключение чекбоксар короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //не найденные по запросу фильмы

  function handleSearchMovies(qwery) {
    setSearchQwery(qwery);
  }

  function handleSchortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQwery);
    setFilterIsMovies(isShortMovies ? filterTimeMovies(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQwery]);

  useEffect(() => {
    if (filterIsMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filterIsMovies]);

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchCards={handleSearchMovies}
        onFilter={handleSchortMovies} />
      <MoviesCardList
        cards={filterIsMovies}
        isSavedMovies={true}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        onCardDelete={onCardDelete} />
      <Footer />
    </section>
  );
}

export default SavedMovies;