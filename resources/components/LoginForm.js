import './App/App.css';
import React from 'react';
import http from "./http";
import history from "./history"
import Error from "./Error";
import Form from "./Form";
import {CredentialsContext} from "./credentials";

class LoginForm extends Form {

    static contextType = CredentialsContext;

    constructor(params) {
        super(params);
        this.state = {
            name: null,
            password: null,
            errorText: "",
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.lockForm();

        http("/login", {
            name: this.state.name,
            password: this.state.password,
        }, "POST")
        .then(res => {
            this.unlockForm();
            if (res.response.status === 200) {
                localStorage.setItem("api_token", res.data.api_token);
                localStorage.setItem("user_name", res.data.user_name);
                this.context.updateCredentials(res.data.user_name);
                history.push('/');
            } else if (res.response.status === 401) {
                this.setState({ errorText: "Wrong username or password!" });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <form
                    className="form d-inline-block"
                    onSubmit={evt => this.handleSubmit(evt)}
                >
                    <table>
                        <tbody>
                        <tr>
                            <td colSpan="2">Login</td>
                        </tr>
                        <tr>
                            <td><label htmlFor="login-input">Username</label></td>
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
            </React.Fragment>
        );
    }
}

export default LoginForm;
