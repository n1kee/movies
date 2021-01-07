import React, {useContext, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import MovieList from "./MovieList/MovieList";
import MovieDetails from "./MovieDetails/MovieDetails";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import history from "./history";
import {AppContext} from "./globals";

const routes = [
    {
        path: "/",
        name: "Home",
        exact: true,
        component: MovieList,
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
        name: "Profile",
        path: "/profile",
        component: UserProfile,
    },
    {
        name: "Logout",
        path: "/logout",
        component: function () {
            const credentialsContext = useContext(AppContext);
            useEffect(() => {
                credentialsContext.updateCredentials(null);

                history.push("/");
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
