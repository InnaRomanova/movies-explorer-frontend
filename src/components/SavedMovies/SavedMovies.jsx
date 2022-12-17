import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';

import movieImage from '../../images/image-cards.png';

const movies = [
  { _id: 1, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: true },
  { _id: 2, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
  // { _id: 3, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 4, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 5, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 6, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 7, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 8, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 9, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 10, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 11, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },

];

function SavedMovies() {
    return (
        <section className="movies">
        <Header />
        <SearchForm />
        <MoviesCardList cards={movies} isSavedMovies={true} />
        <Footer />
    </section>
    );
}

export default SavedMovies;