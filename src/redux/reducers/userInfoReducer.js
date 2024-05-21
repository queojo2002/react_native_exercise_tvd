import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_HANDLE_EVENT,LOGOUT_HANDLE_EVENT } from "../actions";


const initialState = {
    userData: null,
}

export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_HANDLE_EVENT:
            return {
                ...state,
                userData: action.userData,
            }
        case LOGOUT_HANDLE_EVENT:
            return {
                ...state,
                userData: null,
            }
        default:
            return state;
    }
}

