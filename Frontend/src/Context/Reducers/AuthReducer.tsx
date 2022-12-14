import { ActionsProps } from "../Actions/ActionProps.types";
import { Login, Logout , OpenMenu} from "../Actions/AuthActions/AuthActions-types";
import { userProps } from "../InitialStates/AuthInitialState";

const userReducer = (state:userProps , action:ActionsProps ):any => {
    switch (action.type) {
        case Login:
            return{
                ...state,
                user:action.payload,
                isLogedin:true
            }
        case Logout:
            localStorage.removeItem('AccessToken')
            return{
                ...state,
                user:null,
                isLogedin:false
            }
        case OpenMenu:
            return{
                ...state,
                OpenMenu:action.payload
            }
        default:
            return state;
    }
}

export default userReducer;