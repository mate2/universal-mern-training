import axios from 'axios';

// GET CART
export function getCart() {
    return function(dispatch) {
        axios.get('/api/cart')
            .then((response) => {
                dispatch({
                    type: 'GET_CART',
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'GET_CART_REJECTED',
                    payload: err
                });
            });
    };
};

// ADD TO CART
export function addToCart(cart) {
    return function(dispatch) {
        axios.post('/api/cart', cart)
            .then((response) => {
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'ADD_TO_CART_REJECTED',
                    payload: err
                });
            });
    };
};

// UPDATE CART
export function updateCart(_id, unit, cart) {
    // Create a copy of the current array of books
    const currentBookToUpdate = cart;
    // Determine at which index in books array is the book to be deleted
    const indexToUpdate = currentBookToUpdate.findIndex((book) => {
        return book._id === _id;
    });

    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };
    
    const cartUpdate = [
        ...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)
    ];

    return function(dispatch) {
        axios.post('/api/cart', cartUpdate)
            .then((response) => {
                dispatch({
                    type: 'UPDATE_CART',
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'UPDATE_CART_REJECTED',
                    payload: err
                });
            });
    };
};

// DELETE FROM CART
export function deleteCartItem(cart) {
    return function(dispatch) {
        axios.post('/api/cart', cart)
            .then((response) => {
                dispatch({
                    type: 'DELETE_CART_ITEM',
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'DELETE_CART_ITEM_REJECTED',
                    payload: err
                });
            });
    };
};

