import React from "react";
import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';
import SearchError from "../SearchError/SearchError";

function MoviesCardList({ cards, isSavedMovies, isNotFound }) {
    const [end, setEnd] = useState(12);

    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 2000)
    return (

        <section className="cards">
            
            {isLoading ? (<Preloader />) : (                
            isNotFound ? <SearchError errorText={'Ничего не найдено'} /> :
                <>
                    <ul className="cards__list">
                        {cards.slice(0, end).map((card) =>(
                        <MoviesCard 
                            key={card._id} 
                            card={card}
                            isSavedMovies={isSavedMovies} 
                        />))}
                    </ul>
                    <div className="cards__container">
                        {isSavedMovies ? '' : <button className="cards__still-button"
                            onClick={() => { setEnd(end + 3) }}>Ещё</button>}
                    </div>
                </>
                        )}

        </section>
    );
}

export default MoviesCardList;