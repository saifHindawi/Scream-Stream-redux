import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import AllReducers from './reducers'

const initalState = {

}

const middleware = [thunk]
const store = createStore(AllReducers, initalState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;