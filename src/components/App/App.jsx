import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
const [currentUser, setCurrentUser] = useState({});

    return (
        <CurrentUserContext.Provider value={ currentUser }>
        <div className="page">
            <div className="page__content">
                <Switch>
                    <Route path="/">
                        <Header />
                        <Main />
                        <Footer />
                        </Route>
                        <Route path="/signup">
                            <Redirect to="/" />
                        </Route>
                        <Route path="/signin">
                            <Redirect to="/" />
                        </Route>
                        <ProtectedRoute
                        path="/movies" />
                        <ProtectedRoute
                        path="/saved-movies" />
                        <ProtectedRoute
                        path="/profile" />
                </Switch>
            </div>
           
        </div>
        </CurrentUserContext.Provider>
    )
}

export default App;