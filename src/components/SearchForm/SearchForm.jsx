import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearchCards, onFilter, isShortMovies }) {
    const [qwery, setQwery] = useState('');
    const [isQweryError, setIsQweryError] = useState(false);
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        if (qwery.trim().length === 0) {
            setIsQweryError(true);
        } else {
            setIsQweryError(false);
            onSearchCards(qwery);
        }
    }

    function handleQwery(e) {
        setQwery(e.target.value);
    }

    useState(() => {
        if(location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
            const localQwery = localStorage.getItem('movieSearch');
            setQwery(localQwery);
        }
    }, [location]);
    
    return (
        <section className="search">
            <form className="search__form" >
                <input className="search__input"
                    name="qwery"
                    type="text"
                    placeholder="Фильм"
                    onChange={handleQwery}
                    value={qwery || ''}></input>
                <button className="search__button"
                    type="submit"
                    onClick={handleSubmit}>Поиск</button>
            </form>
            <FilterCheckbox 
            onFilter={onFilter}
            isShortMovies={isShortMovies}/>
        </section>
    );
}

export default SearchForm;