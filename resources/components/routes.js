import React, {useContext, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import MovieList from "./MovieList/MovieList";
import MovieDetails from "./MovieDetails/MovieDetails";
import LoginForm from "./LoginForm";
import history from "./history";
import Likes from "./Likes";
import http from "./http";
import {AppContext} from "./globals";

const routes = [
    {
        path: "/",
        name: "Home",
        exact: true,
        component: MovieList,
    },
    {
        name: "Likes",
        path: "/likes",
        component: Likes,
    },
    {
        name: "Login",
        path: "/login",
        component: LoginForm,
    },
    {
        name: "Successfully logged in",
        path: "/login-success/:userName/:userToken",
        component: function (params) {
            const appContext = useContext(AppContext);
            const csrfToken = params.match.params.userToken;
            document.querySelector('[name="_token"]')
                .value = csrfToken;
            useEffect(() => {
                console.log("csrfToken", csrfToken);
                appContext.updateGlobals({
                        userName: params.match.params.userName
                    }, () => history.push("/"));
            });
            return null;
        },
    },
    {
        name: "Movie details",
        path: "/movies/:movieId",
        component: MovieDetails,
    },
    {
        name: "Logout",
        path: "/logout",
        component: function () {
            const appContext = useContext(AppContext);
            useEffect(() => {
                http(`/logout`, {}, "POST").then(res => {
                    console.log("%%%");
                    appContext.updateGlobals({
                        userName: ""
                    });
                });
            });
            return null;
        },
    },
];

export function LinkList() {
    return routes.map(rt => (
        <Link to={rt.path} key={rt.name}>{rt.name}</Link>
    ));
}

export default function RouteCfg() {
    return (
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    );
};

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}
