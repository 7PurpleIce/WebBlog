import { ACTION_TYPE } from "../actions";
import { ROLE } from "../constants";

const InitialUserState = {
    id: null,
    login: null,
    roleId: ROLE.GUEST,
    session: null,
}

export const userReducer = (state = InitialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_USER: {
            return{
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.LOGOUT: {
            return InitialUserState;
        }
        default:
            return state;
    }
}