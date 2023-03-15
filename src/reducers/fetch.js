import {GET_USERS} from '../actions/types';

const initialState = {
    users:[],
    loading:true
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            console.log(action.payload);
        return {
            ...state,
            users:action.payload,
            loading:false
        }
        case 'deleting':
            state.users.splice(action.index,1)
            console.log(action.index);
            return{
                ...state,
                users:state.users,
                loading:false
            }
        default: 
            return state
    }
}