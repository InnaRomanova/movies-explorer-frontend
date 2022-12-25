import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [findMovies, setFindMovies] = useState(true);
    const [findSavedMovies, setFindSavedMovies] = useState(true);
    const [errorRequest, setErrorRequest] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useNavigate();
    const location = useLocation().pathname;
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPreloader, setIsPreloader] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            api.checkToken()
                .then(({ name, email, _id }) => {
                    setLoggedIn(true);
                    setCurrentUser({ name, email, _id });
                    history(location.pathname);
                })
                .catch((err) => {
                    setLoggedIn(false);
                    localStorage.removeItem('jwt');
                    history('/');
                    console.log(`Ошибка проверки токена: ${err}`);
                })
        }
    }, []);

    useEffect(() => {
        if (loggedIn && location.pathname === '/movies') {
            setIsPreloader(true);
            api.getMovies()
                .then((res) => {
                    if (res.length) {
                        localStorage.setItem('movies',
                            JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http'))))
                        );
                        setMovies(JSON.parse(localStorage.getItem('movies')));
                        setFindMovies(true);
                    } else {
                        setFindMovies(false);
                    }
                })
                .catch((err) => {
                    setFindMovies(false);
                    console.log(`Ошибка при загрузке списка фильмов: ${err}`)
                })
                .finally(() => setTimeout(() => {
                    setIsPreloader(false);
                }, 2000));
        }
    }, [loggedIn, location]);

    useEffect(() => {
        if (loggedIn && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
            api.getMovies()
                .then((res) => {
                    if (res.length) {
                        const ownerSavedMovies = res.filter(item => (item.owner === currentUser._id));
                        localStorage.setItem('savedMovies', JSON.stringify(ownerSavedMovies));
                        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
                        setFindSavedMovies(true);
                    } else {
                        setFindSavedMovies(false);
                    }
                })
                .catch((err) => {
                    setFindSavedMovies(false);
                    console.log(`Ошибка загрузки списка сохранённых фильмов: ${err}`)
                })
                .finally(() => setTimeout(() => {
                    setIsPreloader(false);
                }, 2000));
        }
    }, [loggedIn, location, currentUser]);

    //регистрация пользователя
    function handleRegister({ name, email, password }) {
        api.signUp({ name, email, password })
            .then(() => {

                history('/movies');
            })
            .catch((err) => {
                setErrorRequest(true);
                console.log(`Ошибка при регистрации: ${err}`);
            });
    }

    //авторизация пользователя
    function handleLogin({ email, password }) {
        // fetch(`https://api.romanova.nomoredomains.club/signin`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       email: email,
        //       password: password
        //     })
        //   })
        api.signIn({ email, password })
            .then((res) => {
                localStorage.setItem('jwt', Cookies.get('token'));
                setLoggedIn(true);
                history('/movies');
            })
            .catch((err) => {
                setErrorRequest(true);
                console.log(`Ошибка при авторизации: ${err}`);
            })
    }

    // выход из аккаунта
    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history('/');
    };

    // редактирование профиля
    function handleUpdateProfile(name, email) {
        api.updateProfile(name, email)
            .then((user) => {
                setCurrentUser(user);
                setErrorRequest(false);
                setIsSuccess(true);
                setTimeout(() => setErrorRequest(false), 4000);
            })
            .catch((err) => {
                setErrorRequest(true);
                setIsSuccess(false);
                setTimeout(() => setErrorRequest(false), 4000);
                console.log(`Ошибка выхода из аккаунта: ${err}`);
            });
    }

    function handleSearchMovie() {
        console.log('test');
    }

    //сохранение фильмов
    function handleSaveMovie(movie) {
        api.savedMovies(movie)
            .then((newSavedMovie) => {
               localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));
               setSavedMovies([JSON.parse(localStorage.getItem('savedMovies')), ...savedMovies]);
            })
            .catch((err) => {
                console.log(`Ошибка сохранения фильма: ${err}`);
            });
    }

    //удаление фильмов
    function handleDeleteMovie(movie) {
        api.deleteCard(movie._id)
            .then(() => {
                const res = savedMovies.filter((item) => item.movieId !== movie.movieId);
                localStorage.setItem('savedMovies', JSON.stringify(res));
                if(!JSON.parse(localStorage.getItem('savedMovies')).length)
                setFindMovies(false);
            })
            .catch((err) => {
                console.log(`Ошибка удаления сохраненного фильма из списка: ${err}`);
            });
    }



    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page__content">
                    <Routes>
                        <Route exac path="/" element={<div>
                            <Header />
                            <Main />
                            <Footer />
                        </div>} >
                        </Route>
                        <Route path="/signup" element={
                            <Register onRegister={handleRegister} />} >
                        </Route>
                        <Route path="/signin" element={
                            <Login onLogin={handleLogin} />} >
                        </Route>

                        <Route path="/movies" element={
                            <ProtectedRoute
                            loggedIn={loggedIn}
                            component={Movies}
                            isPreloader={isPreloader}
                            movies={movies}
                            savedMovies={savedMovies}
                            onDelete={handleDeleteMovie}
                            onSave={handleSaveMovie}
                            onSearch={handleSearchMovie}
                            >
                            </ProtectedRoute>} >
                        </Route>

                        <Route path="/saved-movies" element={
                            <ProtectedRoute
                            component={SavedMovies}
                            loggedIn={loggedIn}
                            isPreloader={isPreloader}
                            movies={movies}
                            savedMovies={savedMovies}
                            onDelete={handleDeleteMovie} >
                            </ProtectedRoute>} >
                        </Route>
                        <Route path="/profile" element={
                            <ProtectedRoute
                            loggedIn={loggedIn}
                            onLogout={handleLogout}
                            onUpdateProfile={handleUpdateProfile}
                            component={Profile} >
                            </ProtectedRoute>} >
                        </Route>
                        <Route path="/*" element={
                            <NotFound />} >
                        </Route>

                    </Routes>
                </div>
            </CurrentUserContext.Provider>
        </div >
    )
}

export default App;