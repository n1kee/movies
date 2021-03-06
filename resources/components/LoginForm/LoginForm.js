import '../App/App.css';
import React from 'react';
import http from "../http";
import Error from "../Error";
import {AppContext} from "../globals";
import Component from "../Component";

class LoginForm extends Component {

    static contextType = AppContext;

    state = {
        name: null,
        password: null,
        errorText: "",
    };

    /**
     * Handles the login form submit.
     *
     * @param event The form submit event.
     */
    handleSubmit(event) {
        event.preventDefault();
        this.context.updateGlobals({ isLoading: true });

        http("/login", {
            email: this.state.name,
            password: this.state.password,
        }, "POST")
        .then(res => {
            const globalContextUpd = { isLoading: false };
            if (res.response.status === 401) {
                this.setState({ errorText: "Wrong username or password!" });
            }
            this.context.updateGlobals(globalContextUpd);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="login-form">
                    <form
                        className="form d-inline-block"
                        onSubmit={evt => this.handleSubmit(evt)}
                    >
                        <table>
                            <tbody>
                            <tr>
                                <td><label htmlFor="login-input">Login</label></td>
                                <td>
                                    <input
                                        id="login-input"
                                        className="form-control"
                                        onChange={evt => this.setState({ name: evt.target.value })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="pwd-input">Password</label></td>
                                <td>
                                    <Error errorText={this.state.errorText}>
                                        <input
                                            id="pwd-input"
                                            className="form-control"
                                            onChange={evt => this.setState({ password: evt.target.value })}
                                        />
                                    </Error>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><input type="submit" value="Submit" /></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginForm;
