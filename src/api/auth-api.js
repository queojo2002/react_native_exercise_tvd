import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const logoutUser = () => {
    return auth().signOut();
}


export const signUpUser = async ({ name, email, password }) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
       
        const user = userCredential.user;
        
        await auth().currentUser.updateProfile({
            displayName: name,
        });

        return { user };
    } catch (error) {
        return { error: error.message };
    }
};


export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return { user: userCredential.user };
    } catch (error) {
        return { error: error.message };
    }
};
