// REACT 
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// REACT ROUTER
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import combined reducers
import reducers from './reducers/index';
// import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

import routes from './routes';

// Step 1 create the store
const middleware = applyMiddleware(thunk, logger);
// WE WILL PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

// store.subscribe(function(){
//     console.log('Current state is : ', store.getState());
// });

const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
);

render(
    Routes, document.getElementById('app')
);

// Step 2 create and dispatch actions
// store.dispatch(postBooks());

// DE:ETE a book
// store.dispatch(deleteBooks({id: 1}));

// UPDATE a book
// store.dispatch(updateBooks({
//     id: 2,
//     title: 'Learn React in 24h'
// }));

// -->> CART ACTIONS <<--
// store.dispatch(addToCart([{id: 1}]));
