

// Books Reducers
const initialState = {
    books: []
}

export function booksReducers(state=initialState, action){
    switch(action.type){
        case "GET_BOOKS":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {...state, books: [...action.payload]};
        break;
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {...state, books: [...state.books, ...action.payload], msg: 'Saved! Click to continue', style: 'success', validation: 'success'};
        break;
        case "POST_BOOK_REJECTED":
            return {...state, msg: 'Please try again', style: 'danger', validataion: 'error'};
        break;
        case "RESET_BUTTON":
            return {...state, msg: null, style: 'primary', validation: null};
        break;
        case "DELETE_BOOK":
            // Create a copy of the current array of books
            const currentBookToDelete = [...state.books];
            // Determine at which index in books array is the book to be deleted
            const indexToDelete = currentBookToDelete.findIndex((book) => {
                return book._id === action.payload;
                // return book._id === parseInt(action.payload);
            });
            // use slice to remove the book at the specified index
            return {
                books: [
                    ...currentBookToDelete.slice(0, indexToDelete),
                    ...currentBookToDelete.slice(indexToDelete + 1)
                ]
            };
        break;
        case 'UPDATE_BOOK':
            // Create a copy of the current array of books
            const currentBookToUpdate = [...state.books];
            // Determine at which index in books array is the book to be deleted
            const indexToUpdate = currentBookToUpdate.findIndex((book) => {
                return book._id === action.payload._id;
            });
            // Create a new book object with the new values 
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            };
            // Use slice to remove the book at specidied index, replace with the new object and concatenate with the res of items in array
            return {
                books: [
                    ...currentBookToUpdate.slice(0, indexToUpdate),
                    newBookToUpdate,
                    ...currentBookToUpdate.slice(indexToUpdate + 1)
                ]
            };
        break;
    }
    return state;
};
