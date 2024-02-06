import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';


const store = configureStore({
    reducer: {
        root: rootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export default store;