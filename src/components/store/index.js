import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlaware = [thunk];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlaware))
);

export default store;