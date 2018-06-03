import axios from 'axios';

// GET BOOKS
export function getBooks() {
    return function(dispatch) {
        axios.get('/api/books')
            .then((response) => {
                dispatch({
                    type: 'GET_BOOKS',
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'GET_BOOKS_REJECTED',
                    payload: err
                });
            });
    };
};

// POST book
export function postBooks(book){
    return function(dispatch) {
        axios.post('/api/books', book)
            .then((response) => {
                dispatch({
                    type: 'POST_BOOK',
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'POST_BOOK_REJECTED',
                    payload: err
                });
            });   
    };

    // return {
    //     type: "POST_BOOK", 
    //     payload: book
    // }
};

// DELETE book
export function deleteBooks(id){
    return function(dispatch) {
        axios.delete('/api/books/' + id)
            .then((response) => {
                dispatch({
                    type: 'DELETE_BOOK',
                    payload: id
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'DELETE_BOOK_REJECTED',
                    payload: err
                });
            });
    };
};

//UPDATE BOOK
export function updateBooks(book){
    return {
        type: "UPDATE_BOOK", 
        payload: book
    }
};

// RESET FORM BUTTON
export function resetButton(book){
    return {
        type: "RESET_BUTTON", 
    }
};
