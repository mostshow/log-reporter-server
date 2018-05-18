import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import BugList from './components/BugList';
import Login from './components/Login';


export default (
    <Router>
    <Route path="/" component={App}>
      <IndexRoute component={BugList} />
      <Route path="log" component={BugList} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
)


