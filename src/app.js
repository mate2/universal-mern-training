// REACT 
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import { applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// import combined reducers
import reducers from './reducers/index';
// import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

import BooksList from './components/pages/booksList';

// Step 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// store.subscribe(function(){
//     console.log('Current state is : ', store.getState());
// });

render(
    <Provider store={store}>
        <BooksList />
    </Provider>, document.getElementById('app')
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
