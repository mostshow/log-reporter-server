

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory} from 'react-router'


import routes from './routes'
import rootReducer from './reducers/rootReducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
