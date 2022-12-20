import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { useEffect } from 'react';
import axios from 'axios';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setcards] = useState([]);
    const [errorRequest, setErrorRequest] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useNavigate();
    const isLoggedIn = true;

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            const jwt = localStorage.getItem("jwt");


        }
    }, [])

    //регистрация пользователя
    function handleRegister({ name, email, password }) {
        //api.signUp({name, email, password})
        console.log(name, email, password);
        //axios
           // .post('https://api.romanova.nomoredomains.club')
           fetch(`https://api.romanova.nomoredomains.club/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password
            })
          })
            .then((res) => {
                console.log(res);
                history.push('/signin');
            })
            .catch((err) => {
                setErrorRequest(true);
                console.error(err);
            });
    }

    //авторизация пользователя
    function handleLogin({ email, password }) {
        fetch(`https://api.romanova.nomoredomains.club/signin`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })
            .then((res) => {
                console.log(res);
                if (res) {
                    isLoggedIn(true);
                    // localStorage.setItem('jwt', res.token);
                    history.push('/movies');
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                console.error(err);
            })
    }

    // выход и аккаунта
    function handleLogout() {
        localStorage.removeItem('jwt');
        isLoggedIn(false);
        history.push('/');
    }

    // редактирование профиля
    function handleUpdateProfile(name, email) {
        api.updateProfile(name, email)
            .then((user) => {
                setCurrentUser(user);
                setErrorRequest(false);
                setIsSuccess(true);
                setTimeout(() => setErrorRequest(false), 4000);
                console.log(`Ошибка выхода из аккаунта: &{err}`);
            })
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
                            <ProtectedRoute>
                                <Movies movies={cards} />
                            </ProtectedRoute>} >
                        </Route>
                        <Route path="saved-movies" element={
                            <ProtectedRoute>
                                <SavedMovies />
                            </ProtectedRoute>} >
                        </Route>
                        <Route path="/profile" element={
                            <ProtectedRoute><div>
                                <Header />
                                <Profile onLogout={handleLogout}
                                    onUpdateProfile={handleUpdateProfile} />
                            </div>
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