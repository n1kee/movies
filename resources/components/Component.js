import './App/App.css';
import React from 'react';
import {AppContext} from "./globals";

class Component extends React.Component {

    static contextType = AppContext;

    componentWillUnmount() {
        this.context.updateGlobals({ isLoading: false });
    }
}

export default Component;
