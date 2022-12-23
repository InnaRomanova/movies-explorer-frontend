class MainApi {
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

    signUp({name, email, password}) {
        return this._request('/signup', 'POST', {name, email, password});
    }

    signIn(data) {
        return this._request('/signin', 'POST', data);
    }

    logout() {
        return this._request('/signout');
    }

    getProfile() {
        return this._request('/users/me');
    }

    updateProfile(userInfo) {
        return this._request('/users/me', 'PATCH', userInfo)
    }

    getSavedMovies() {
        return this._request('/movies');
    }

    addNewMovies(movie) {
        return this._request('movies', 'POST', JSON.stringify(movie));
    }

    removeMovie(movieId) {
        return this._request(`/movies/${movieId}`, 'DELETE');
    }
}

const api = new MainApi({
    baseUrl: 'https://api.romanova.nomoredomains.club',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
})

export { api }


/*    const pattern = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': this._token,
        },
        credentials: 'include',
    }

    return fetch(
        `${this._baseUrl}/${path}`,
        info ? { ...pattern, body: JSON.stringify(info) } : pattern
    )
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                Promise.reject(`ошибка: ${res.status}`)
            }
        })
}

getUserInfo() {
    return this._request('users/me', 'GET')
}

editUserInfo(userInfo) {
    return this._request('users/me', 'PATCH', userInfo)
}

editAvatar(avatarInfo) {
    return this._request('users/me/avatar', 'PATCH', avatarInfo)
}

getCards() {
    return this._request('cards', 'GET')
}

setNewCard(data) {
    return this._request('cards', 'POST', data)
}

changeLikeCardStatus(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT')
}

changeDeleteCardStatus(id) {
    return this._request(`cards/${id}`, 'DELETE')
}
}
const api = new MainApi({
baseUrl: 'https://api.romanova.nomoredomains.club',
headers: {
    'Content-Type': 'application/json',
},
credentials: 'include',
})

export { api }


export const BASE_URL = '';

export const register = (name, email, password) => {
return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
})
    .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
    })
}

export const login = (email, password) => {
return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
})
    .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
    })
}

export const logout = () => {
return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
})
    .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
    })
}

export const restContent = (token) => {
return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
})
    .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
    })
}
*/
