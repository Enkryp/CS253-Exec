import Immutable from 'immutable';
export const initialState = Immutable.Map({
    request: [],
    authenticated: false,
})

const changeUserState = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                'authenticated': true
            };
        case 'LOGOUT':
            return {
                ...state,
                'authenticated': false
            };
        default:
            return state;
    }
};

export default changeUserState;