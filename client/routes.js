import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import BugList from './components/BugList';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={BugList} />
    </Route>
)


