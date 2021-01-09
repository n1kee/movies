import React from 'react';
import RouteCfg from '../routes';
import Links from "../Links/Links";
import {AppContext} from "../globals";

class App extends React.Component {

    state = {
        userName: "",
        isLoading: false,
        imgHost: "https://image.tmdb.org/t/p/w300/",
        updateGlobals: (state, cb) => {
            this.setState(state, () => cb ? cb() : null);
        },
    };

    componentDidMount() {
        // Set user name in the global context.
        const userNameInput = document.querySelector('[name="user_name"]');
        this.setState({ userName: userNameInput.value });
    }

    render() {

        return (
            <div className="App">
                <AppContext.Provider value={this.state}>
                    <div className={this.state.isLoading ? "invisible" : ""}>
                        <div className={this.state.userName ? "abc" : "invisible"}>
                            <Links></Links>
                        </div>
                        <div className="content"><RouteCfg/></div>
                    </div>
                    <div className="text-center fixed-top">
                        <img
                            className={this.state.isLoading ? "" : "d-none"}
                            src="/img/sand_clock.gif"
                        />
                    </div>
                </AppContext.Provider>
            </div>
        );
  }
}

export default App;
