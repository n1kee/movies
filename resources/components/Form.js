import './App/App.css';
import React from 'react';
import {AppContext} from "./globals";

class Form extends React.Component {

    static contextType = AppContext;

    lockForm() {
        this.context.updateGlobals({ isLoading: true });
        //this.setState({
        //    formClassName: `${this.state.formClassName} d-none`,
        //});
    }

    unlockForm() {
        this.context.updateGlobals({ isLoading: false });
        //this.setState({
        //    formClassName: this.state.formClassName
        //        .replace("d-none", ""),
        //});
    }
}

export default Form;
