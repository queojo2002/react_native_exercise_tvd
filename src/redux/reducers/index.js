import {combineReducers, } from "redux"
import userInfoReducer from "./userInfoReducer"
import authReducer from "./authReducer";

const reducers = combineReducers({
    userInfo: userInfoReducer,
    auth: authReducer,
});

export default reducers;