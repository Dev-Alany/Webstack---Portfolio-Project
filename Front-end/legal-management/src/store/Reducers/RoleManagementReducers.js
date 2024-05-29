// reducer.js

import * as actionTypes from "../ActionTypes";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

export const Rolereducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        roles:null
      };
    case actionTypes.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        roles:null
      };
    default:
      return state;
  }
};


