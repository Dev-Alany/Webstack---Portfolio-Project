const initialState = {
    customData: null,
    status: 'idle',
    error: null,
};

export default function CustomReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_DETAILS_SUCCESS':
            return {
                ...state,
                customData: action.payload,
                status: 'success',
            };
        case 'FETCH_DETAILS_ERROR':
            return {
                ...state,
                error: action.payload,
                status: 'error',
            };
        case 'UPDATE_DETAILS_SUCCESS':
            return {
                ...state,
                customData: action.payload,
                status: 'success',
            };
        case 'UPDATE_DETAILS_ERROR':
            return {
                ...state,
                error: action.payload,
                status: 'error',
            };
        default:
            return state;
    }
}