import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { Rolereducer } from "./Reducers/RoleManagementReducers";
import CustomReducer from "./Reducers/CustomReducer"

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
    roles: Rolereducer,
    custom: CustomReducer,
});

export const store = createStore(reducers, composeEnhancers(middleware));