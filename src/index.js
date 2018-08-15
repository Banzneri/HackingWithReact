import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import routes from './routes';
import './style.css';

const Router = () => (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        {routes}
    </BrowserRouter>
)

ReactDOM.render(
    <Router />,
    document.getElementById('root')
);