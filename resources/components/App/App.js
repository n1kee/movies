import React from 'react';
import RouteCfg from '../routes';
import Links from "../Links/Links";
import {CredentialsContext} from "../credentials";

class App extends React.Component {

    render() {
        this.updateCredentials = userName => {
            this.setState(state => ({ userName }));
        };

        this.state = {
            userName: localStorage.getItem("user_name"),
            updateCredentials: this.updateCredentials,
        };

        return (
            <div className="App">
                <CredentialsContext.Provider value={this.state}>
                    <Links></Links>
                    <div className="content">
                        <RouteCfg/>
                    </div>
                </CredentialsContext.Provider>
            </div>
        );
  }
}

export default App;
