import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return { user: userCredential.user };
    } catch (error) {
        return { error: error.message };
    }
};

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

        await firestore().collection('users').doc(email).set({
            name: name,
            phone: "0326393540",
            address: "LNC",
            email: email,
            password: password,
            role: "user"
        });
        return { user };
    } catch (error) {
        return { error: error.message };
    }
};


