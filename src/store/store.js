import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { rootReducer, demoReducer } from './reducers';


const store = configureStore({
    reducer: {
        root: rootReducer,
        demo: demoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export default store;