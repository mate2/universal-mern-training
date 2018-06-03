// REACT 
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// REACT ROUTER
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import combined reducers
import reducers from './reducers/index';
// import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

// Step 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

// store.subscribe(function(){
//     console.log('Current state is : ', store.getState());
// });

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={BooksList} />
                <Route path='/admin' component={BooksForm} />
                <Route path='/cart' component={Cart} />
            </Route>
        </Router>
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
