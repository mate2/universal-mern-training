import {combineReducers} from 'redux';

// Here import Reducers to be combine
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

// Here combine the Reducers
export default combineReducers({
    books: booksReducers,
    cart: cartReducers,
});
