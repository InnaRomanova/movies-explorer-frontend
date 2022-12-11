import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setcards] = useState([]);
    const isLoggedIn = true;

    return (
        <div className="page">
            <div className="page__content">
                <Routes>
                    <Route exac path="/" element={<div>
                        <Header />
                        <Main />
                        <Footer />
                    </div>} >
                    </Route>
                    <Route path="/signup" element={
                        <Register />} >
                    </Route>
                    <Route path="/signin" element={
                        <Login />} >
                    </Route>
                    <Route path="/movies" element={
                        <Movies movies={cards} />} >
                    </Route>
                    <Route path="saved-movies" element={
                        <SavedMovies />} >
                    </Route>
                    <Route path="/profile" element={<div>
                        <Header />
                        <Profile />
                    </div>} >
                    </Route>
                    <Route path="/*" element={
                        <NotFound />} >                        
                    </Route>
                </Routes>
            </div>
        </div >
    )
}

export default App;