// ADD TO CART

export function addToCart(book) {
    return {
        type: 'ADD_TO_CART',
        payload: book
    };
};

// DELETE FROM CART

export function deleteCartItem(book) {
    return {
        type: 'DELETE_CART_ITEM',
        payload: book
    };
};

