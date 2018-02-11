import {createStore} from 'redux';

// Step 3 define reducers
const reducer = function(state={books:[]}, action){
    switch(action.type){
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books: [...state.books, ...action.payload]};
        break;
    }
    return state;
};

// Step 1 create the store
const store = createStore(reducer);

store.subscribe(function(){
    console.log('current state is : ', store.getState());
});

// Step 2 create and dispatch actions
store.dispatch({
    type: "POST_BOOK", 
    payload: [{
        id: 1,
        title: 'book title',
        description: 'book description',
        price: 33.33,
    },
    {
        id: 2,
        title: 'book title 2',
        description: 'book description 2',
        price: 45.32,
    }]
});

// Dispatch a second action
store.dispatch({
    type: "POST_BOOK", 
    payload: [{
        id: 1,
        title: 'book title 3',
        description: 'book description 3',
        price: 33.33,
    }]
});