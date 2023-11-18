import { legacy_createStore as createStore, applyMiddleware, compose ,combineReducers} from "redux";
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';


import reducers from "../Redux/reducers";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = (context) => {
    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    store.__persistor = persistStore(store);
    return store;
};


export const wrapper = createWrapper(makeStore, { debug: true });