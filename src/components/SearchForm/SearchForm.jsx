import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSearchCards}) {
    return (
        <section className="search">
            <form className="search__form">
                {/* <label className="search__label" htmlFor="search-input">
                </label> */}
                <input className="search__input" placeholder="Фильм" required></input>
                <button className="search__button" type="submit" onClick={onSearchCards}>Поиск</button>
            </form>
            <FilterCheckbox />
        </section>
    );
}

export default SearchForm;