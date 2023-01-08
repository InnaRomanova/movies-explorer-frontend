class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl
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

    _request(path, parameters) {
        return fetch(path, parameters)
            .then((res) => {
                return (res.ok) ? res.json() : Promise.reject(res.status);
            });
    }


    getMovies() {
        return this._request(`${this._baseUrl}beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/',
    headers: {
        'Content-Type': 'application/json',
    },
    // credentials: 'include',
})

export { moviesApi }