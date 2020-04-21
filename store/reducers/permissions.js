import {ADD_USER_PERMISSION} from "../actions";

export const permissions = (state={}, action) => {
    switch (action.type) {
        case ADD_USER_PERMISSION:
            return {
                ...state,
                token: [action.token]
            }

        default:
            return state
    }
}
