

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory} from 'react-router'
import jwtDecode from "jwt-decode";

import routes from './routes'
import rootReducer from './reducers/rootReducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
);
if (localStorage.jwtToken) {
  // store.dispatch(user.setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
