import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { LOGIN_HANDLE_EVENT, LOGOUT_HANDLE_EVENT } from '.';
import { loginUser, logoutUser } from '../../api/auth-api';


export const login = ({ email, password }) => async (dispatch) => {
    try {
        const result = await loginUser({ email, password });
        if (result.user) {
            await AsyncStorage.setItem('userData', JSON.stringify(result.user));
            return { success: true, userData: result.user};
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const logout = () => async (dispatch) => {
    try {
        await logoutUser();
        await AsyncStorage.removeItem('userData');
        dispatch({ type: LOGOUT_HANDLE_EVENT, userData: null });
        return { success: true, userData: null };
    } catch (error) {
        return { success: false, error: error.message };
    }
};



export const loadUserFromStorage = () => async (dispatch) => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            const userDoc = await firestore().collection('users').doc(JSON.parse(userData).email).get();
            dispatch({ type: LOGIN_HANDLE_EVENT, userData: userDoc._data });
        }
    } catch (error) {
        console.error('không thể load user từ storage:', error);
    }
};