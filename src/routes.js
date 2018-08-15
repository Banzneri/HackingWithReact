import React from 'react';
import { Route } from 'react-router-dom';

import App from './pages/App.js';
import List from './pages/List.js';
import Detail from './pages/Detail.js';
import User from './pages/User.js';

const routes = (
    <div>
        <Route path="/" component={ App } />
        <Route exact path="/" component={ List } />
        <Route path="/detail/:repo" component={ Detail } />
        <Route path="/user/:name" component={ User } />
    </div>
);

export default routes;