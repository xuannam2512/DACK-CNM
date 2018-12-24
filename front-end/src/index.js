import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/components/App';
import { Provider } from "react-redux";
import store from "./js/store/index";

//import bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
