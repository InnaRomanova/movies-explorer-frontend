import { SHORTS } from "../utils/constants";

//фильтр
export function filterMovies(movies, query) {
    const moviesQuery = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userQuery = query.toLowerCase().trim();
        return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
    });
    return moviesQuery;
}

//фильтрация по длительности
export function filterTimeMovies(movies) {
    return movies.filter((movie) => movie.duration < SHORTS);
}