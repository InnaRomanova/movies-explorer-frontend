class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        // this._getResponse = getResponse;
    }

    //Отправка запроса
    _getResponse(path, parameters) {
        return fetch(`${this._baseUrl}${path}`, parameters)
            .then((res) => {
                return (res.ok) ? res.json() : Promise.reject(res.status);
            });
    }

    // _request(
    //     path = '',
    //     method = 'GET',
    //     body = null,
    //     headers = this._headers,
    //     credentials = this._isCredentials,
    // ) {
    //     return fetch( {
    //         method, body, headers, credentials
    //     }).then((res) => this._getResponse(res))
    // }

    //регистрация
    signUp({ name, email, password }) {
        return this._getResponse('/signup', {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ name, email, password }),
        });
    }

    //авторизация
    signIn({ email, password }) {
        return this._getResponse('/signin', {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ email, password }),
        });
    }

    //выход
    logout() {
        return this._getResponse('/signout', {
            method: 'GET',
            headers: {
                ...this._headers,
            },
        });
    }

    //редактирование профиля
    updateProfile({ name, password }) {
        return this._getResponse('/users/me', {
            method: 'PATCH',
            headers: {
                ...this._headers,
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ name, password }),
        });
    }

    //получение сохраненных фильмов из сервера
    getMovies() {
        return this._getResponse('/movies', {
            headers: {
                ...this._headers,
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        });
    }

    //сохранение фильмов в список пользователя
    saveMovie(movie) {
        return this._getResponse('movies', {
            method: 'POST',
            headers: {
                ...this._headers,
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            }),
        });
    }

    //проверка токена
    checkToken() {
        return this._getResponse('/users/me', {
            method: 'GET',
            headers: {
                ...this._headers,
                'authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }

    removeMovie(movieId) {
        return this._getResponse(`movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        });
    }
}

const api = new MainApi({
    baseUrl: 'https://api.romanova.nomoredomains.club',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'include',
})

export { api }
