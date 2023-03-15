import {GET_ADMIN, ADMIN_ERROR,GET_USERS, USERS_ERROR} from './types'
import axios from 'axios';

export const login=(email,password)=> async dispatch => {

    try{
        const res = await axios.get('http://localhost/redux_project/backend/login.php?email='+email+'&password='+password);
        dispatch( {
            type: GET_ADMIN,
            payload: res.data
        })

    }
    catch(e){
        dispatch( {
            type: ADMIN_ERROR,
            payload: console.log(e),
        })
    }
}

export const getUsers = () => async dispatch => {

    try{
        const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/capital`)
        dispatch( {
            type: GET_USERS,
            payload: res.data.data
        })
    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }

}
export const logout =()=>{
    window.location.href = "/";
    return{
        type:'logout'
    }
}

export const deleting=(index)=> dispatch => {
    dispatch( {
        type: 'deleting',
        index
    })
}