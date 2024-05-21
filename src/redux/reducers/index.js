import {combineReducers, } from "redux"
import userInfoReducer from "./userInfoReducer"

const reducers = combineReducers({
    userInfo: userInfoReducer
});

export default reducers;