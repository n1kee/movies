import React, {useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import MovieList from "./MovieList/MovieList";
import MovieDetails from "./MovieDetails/MovieDetails";
import LoginForm from "./LoginForm";
import history from "./history";
import Likes from "./Likes";
import http from "./http";

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
        name: "Movie details",
        path: "/movies/:movieId",
        component: MovieDetails,
    },
    {
        name: "Logout",
        path: "/logout",
        component: function () {
            useEffect(() => {

                http(`/logout`, {}, "POST").then(res => {
                    console.log("%%%");
                    history.push("/");
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
