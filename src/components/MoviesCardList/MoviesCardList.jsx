import React from "react";
import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';


function MoviesCardList({cards, isSavedMovies}) {
const [end, setEnd] = useState(12);
console.log(cards.slice(0, end));
    return (
        <section className="cards">
        <ul className="cards__list">
            {cards.slice(0, end).map((card) => 
            (<MoviesCard key={card._id} card={card} 
                isSavedMovies={isSavedMovies} />))}
        </ul>
        <div className="cards__container">
            {isSavedMovies ? '' : <button className="cards__still-button" onClick={() => {setEnd (end + 3)}}>Ещё</button>}
            </div>
        </section>
    );
}

export default MoviesCardList;