import { createStore as createReduxStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export const createStore = (initialState = {}) => {
    const store = createReduxStore(rootReducer, initialState, compose(applyMiddleware(thunk)));

    return store;
};
