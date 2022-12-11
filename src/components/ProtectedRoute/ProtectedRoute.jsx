import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return <Route>{() => (props.loggidIn ? <Component {...props} /> : <Navigate to="/" />)}</Route>;
}

export default ProtectedRoute;