import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import {Router} from 'react-router-dom';
import history from "./history";

ReactDOM.render(
    <Router history={history}>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
