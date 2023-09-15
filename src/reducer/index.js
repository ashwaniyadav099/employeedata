import {combineReducers} from 'redux';
const initialvalue ={
    data:{},
}


const datareducer=(state = initialvalue , action)=>{
    switch(action.type){
        case "ADDDATA":
            state.data = action.payload;
            return {...state}
        default:
            return state
    }
}
export const rootreducer = combineReducers({
    datareducer
})