import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css';
import { useState } from "react";

import movieImage from '../../images/image-cards.png';

function Movies({onSearchCards}) {
    const [movies] = useState('');
    return (
        <section className="movies">
            <Header />
            <SearchForm onSearchCards={onSearchCards} />
            <MoviesCardList cards={movies}/>
            <Footer />
        </section>
    );
}

export default Movies;