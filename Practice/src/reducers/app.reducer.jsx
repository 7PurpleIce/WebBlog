import { ACTION_TYPE } from "../actions";

const InitialAppState = {
    wasLogout: false
}

export const appReducer = (state = InitialAppState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOGOUT:
            return {
                ...state,
                wasLogout: !state.wasLogout,
            }
        default:
            return state;
    }
}