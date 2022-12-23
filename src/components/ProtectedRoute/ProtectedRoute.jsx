import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    console.log(props.loggedIn);
    return <Route>{() => (props.loggedIn ? <Component {...props} /> : <Navigate to="/" />)}</Route>;
}

export default ProtectedRoute;