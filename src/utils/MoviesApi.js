class MovieApi {
    constructor({ baseUrl, headers, credentials }) {
        this._baseUrl = baseUrl
        this._headers = headers
        this._isCredentials = credentials
    }

    _getResponse(res) {
        if (!res.ok) {
            return Promise.reject( res.json()); // возвращает ошибку
          }
          return res.json(); //если да, то возвращает полученные данные
        }
    

    _request(
        path = '',
        method = 'GET',
        body = null,
        headers = this._headers,
        credentials = this._isCredentials,
    ) {
        return fetch(`${this._baseUrl}${path}`, {
            method, body, headers, credentials
        }).then((res) => this._getResponse(res))
    }

    getMovies({name, email, password}) {
        return this._request('/movies', 'GET', {name, email, password});
    }

    getMovies({name, email, password}) {
        return this._request('/movies', 'GET', {name, email, password});
    }

    getMovies({name, email, password}) {
        return this._request('/movies', 'GET', {name, email, password});
    }
    
}

const movieApi = new MovieApi({
    baseUrl: 'https://api.romanova.nomoredomains.club',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
})

export { movieApi }