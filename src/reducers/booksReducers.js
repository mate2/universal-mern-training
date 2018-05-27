

// Books Reducers
const initialState = {
    books: [{
        _id: 1,
        title: 'The Maze Runner',
        description: 'First of the trilogy',
        price: 9.99,
    },
    {
        _id: 2,
        title: 'The Maze Runner: Scorch Trials',
        description: 'Second of the trilogy',
        price: 10.99,
    }]
}

export function booksReducers(state=initialState, action){
    switch(action.type){
        case "GET_BOOKS":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {...state, books: [...state.books]};
        break;
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books: [...state.books, ...action.payload]};
        break;
        case "DELETE_BOOK":
            // Create a copy of the current array of books
            const currentBookToDelete = [...state.books];
            // Determine at which index in books array is the book to be deleted
            const indexToDelete = currentBookToDelete.findIndex((book) => {
                return book._id === action.payload._id;
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
