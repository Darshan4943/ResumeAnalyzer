import rootReducer from './reducers/index';

import {createStore} from 'redux';

const Store = createStore(rootReducer);

export default Store;
