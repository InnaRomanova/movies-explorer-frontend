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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/MainApi';
import { useEffect } from 'react';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useNavigate();
    const location = useLocation().pathname;
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    //Проверка токена и авторизация пользователя
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            api
                .checkToken(jwt)
                .then((res) => {
                    if (res) {
                        localStorage.removeItem('allMovies');
                        setIsLoggedIn(true);
                    }
                    history(location);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        if (isloggedIn) {
            api.getProfile()
                .then((profileInfo) => {
                    setCurrentUser(profileInfo);
                })
                .catch((err) => {
                    console.log(err);
                });

            api.getMovies()
                .then((cardsData) => {
                    setSavedMovies(cardsData.reverse());
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isloggedIn, history]);

    //регистрация пользователя
    function handleRegister({ name, email, password }) {
        api.signUp({ name, email, password })
            .then(() => {
                handleLogin({ email, password })
            })
            .catch((err) => {
                console.log(`Ошибка при регистрации: ${err}`);
            });
    }

    //авторизация пользователя
    function handleLogin({ email, password }) {
        api.signIn({ email, password })
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setIsLoggedIn(true);
                history('/movies');
            })
            .catch((err) => {
                console.log(`Ошибка при авторизации: ${err}`);
            })
    }

    // выход из аккаунта
    function handleLogout() {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('movieSearch');
        localStorage.removeItem('shortMovies');
        localStorage.removeItem('allMovies');
        localStorage.removeItem('savedMovies');
        history('/');
    };

    function closeUnsuccessPopup() {
      setIsSuccess(true);
      setIsUpdate(false);
    }

    // редактирование профиля
    function handleUpdateProfile(name, email) {
        setIsLoading(true);
        api.updateProfile(name, email)
            .then((user) => {
                setCurrentUser(user);
                setIsSuccess(true);
                setIsUpdate(true);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(`Ошибка выхода из аккаунта: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    //сохранение фильмов
    function handleSaveMovie(movie) {
        api.savedMovies(movie)
            .then((newSavedMovie) => {
                localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));
                setSavedMovies([JSON.parse(localStorage.getItem('savedMovies')), ...savedMovies]);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(`Ошибка сохранения фильма: ${err}`);
                handleUnauthorized(err);
            });
    }

    //удаление фильмов
    function handleDeleteMovie(movie) {
        api.removeMovie(movie._id)
            .then(() => {
                setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
            })
            .catch((err) => {
                console.log(`Ошибка удаления сохраненного фильма из списка: ${err}`);
            });
    }

    function handleUnauthorized(err) {
        if (err === 'Error: 401') {
            handleLogout();
        }
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page__content">
                    <Routes>
                        <Route exac path="/" element={<div>
                            <Header loggedIn={isloggedIn} />
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
                                loggedIn={isloggedIn}
                                component={Movies}
                                savedMovies={savedMovies}
                                onCardDelete={handleDeleteMovie}
                                handleSaveClick={handleSaveMovie} >
                            </ProtectedRoute>} >
                        </Route>

                        <Route path="/saved-movies" element={
                            <ProtectedRoute
                                component={SavedMovies}
                                loggedIn={isloggedIn}
                                savedMovies={savedMovies}
                                onCardDelete={handleDeleteMovie} >
                            </ProtectedRoute>} >
                        </Route>

                        <Route path="/profile" element={
                            <ProtectedRoute
                                loggedIn={isloggedIn}
                                onLogout={handleLogout}
                                onUpdateProfile={handleUpdateProfile}
                                component={Profile}
                                isLoading={isLoading} >
                            </ProtectedRoute>} >
                        </Route>
                        <Route path="/*" element={
                            <NotFound />} >
                        </Route>
                    </Routes>
                    {/*<InfoTooltip isSuccess={isSuccess} onClose={closeUnsuccessPopup} />*/}
                    <InfoTooltip isSuccess={!isUpdate} isUpdate={isUpdate} onClose={closeUnsuccessPopup} />
                </div>
            </CurrentUserContext.Provider>
        </div >
    )
}

export default App;