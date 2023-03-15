import {combineReducers} from 'redux';
import loginReducer from "./login"


const AllReducers=combineReducers({
    login: loginReducer,
});

export default AllReducers;