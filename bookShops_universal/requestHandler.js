import axios from 'axios';
import React from 'react';
import { createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res) {
    axios.get('http://localhost:3001/books')
        .then((response) => {
            // const myHtml = JSON.stringify(response.data);
            // res.render('index', {myHtml});

            // STEP 1 - Create a redux store on the server
            const store = createStore(reducers, {"books": {"books": response.data}});
            // STEP 2 - Get initial state from the store
            const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
            // STEP 3 - Implement react-router on the server to intercept client request and define what to do with them
            const Routes = { 
                routes: routes,
                location: req.url
            };
            match(Routes, function(error, redirect, props){
                if(error){
                    res.status(500).send("Error fullfilling the request");
                } else if(redirect) {
                    res.status(302, redirect.pathname + redirect.search);
                } else if(props) {
                    const reactComponent = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props} />
                        </Provider>
                    );
                    res.status(200).render('index', {reactComponent, initialState});
                } else {
                    res.status(404).send('Not Found');
                }
            });
        })
        .catch((err) => {
            console.log('#initila server-side rendering error', err);
        });
}

module.exports = handleRender;