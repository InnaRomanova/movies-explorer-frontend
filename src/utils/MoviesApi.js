class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl
        //this._headers = headers
        //this._isCredentials = credentials
    }

    _getResponseData(movies) {
        return movies.map(movie => ({
            country: movie.country,
            director: movie.director,
            year: movie.year,
            description: movie.description,
            image: movie._baseUrl + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: movie._baseUrl + movie.image.url,
            owner: movie.owner,
            movieId: movie.id,
            nameRU: movie.nameRu,
            nameEN: movie.nameEN,
        }))
    }

    _request(res) {
        if (!res.ok) {
            const err = res.json();
            return Promise.reject(res.json(err)); // возвращает ошибку
        }
        const movies = res.json();
        return this._getResponseData(movies); //если да, то возвращает полученные данные
    }

    getMovies() {
        return this._request(fetch(`${this._baseUrl}/beatfilm-movies`));
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    // credentials: 'include',
})

export { moviesApi }