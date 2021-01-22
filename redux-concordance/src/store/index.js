

import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from "./reducers";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware,logger)
    // composeWithDevTools(applyMiddleware(sagaMiddleware))
);


sagaMiddleware.run(mySaga)

export default store;