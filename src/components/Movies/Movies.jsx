import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css';
import { useState, useEffect } from "react";

import movieImage from '../../images/image-cards.png';


function Movies({ onSearchCards }) {
    const [movies] = useState('');
    const [isNotFound, setIsNotFound] = useState(false);
    useEffect(() => {
        if (movies.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [movies]);
    return (
        <section className="movies">
            <Header />
            <SearchForm onSearchCards={onSearchCards} />
            <MoviesCardList
                cards={movies}
                isNotFound={isNotFound} />
            <Footer />
        </section>
    );
}

export default Movies;