import React from 'react';
import RouteCfg from '../routes';
import Links from "../Links/Links";
import {AppContext} from "../globals";

class App extends React.Component {

    state = {
        isLoading: false,
        imgHost: "https://image.tmdb.org/t/p/w300/",
        updateGlobals: state => {
            this.setState(state, () =>  console.log("updateGlobals", state, this.state.isLoading));
        },
    };

    render() {

        return (
            <div className="App">
                <AppContext.Provider value={this.state}>
                    <div className={this.state.isLoading ? "invisible" : ""}>
                        <Links></Links>
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
