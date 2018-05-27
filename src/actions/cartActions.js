// ADD TO CART
export function addToCart(book) {
    return {
        type: 'ADD_TO_CART',
        payload: book
    };
};

// ADD TO CART
export function updateCart(_id, unit) {
    return {
        type: 'UPDATE_CART',
        _id,
        unit
    };
};

// DELETE FROM CART
export function deleteCartItem(book) {
    return {
        type: 'DELETE_CART_ITEM',
        payload: book
    };
};

