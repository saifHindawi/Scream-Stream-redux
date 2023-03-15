import {GET_ADMIN} from '../actions/types';

const initialState = {
    admin:'',
    loading:true,
    error:''
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ADMIN:
            if(action.payload !== ''){
                return{...state,
                    admin:action.payload,
                    loading:false,}
            }else{
                return{
                    ...state,
                    error:'Username / email or password is invalid',
                    loading:false,
                }
            }
            case 'logout':
                return{...state,
                    admin:'',
                    error: '',
                }
        default: return state
    }
}