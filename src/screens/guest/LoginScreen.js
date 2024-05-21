import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { BackButton, Background, Button, Header, Logo, TextInput } from "../../components";
import { theme } from "../../core/theme";
import { emailValidator, passwordValidator } from "../../helpers";
import { login } from "../../redux/actions/authAction";
import firestore from '@react-native-firebase/firestore';
import { LOGIN_HANDLE_EVENT } from "../../redux/actions";


export default LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: "", error: "" })
    const [password, setPassword] = useState({ value: "", error: "" })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();


    const onLoginPressed = async () => {
        setLoading(true);
        setError('');
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setLoading(false)
            return
        }



        try {

            const result = await dispatch(login({
                email: email.value,
                password: password.value
            }));
            if (result.success) {

                const userDoc = await firestore().collection('users').doc(email.value).get();
                if (!userDoc.exists) {
                    await firestore().collection('users').doc(email.value).set({
                        name: result.userData.displayName,
                        phone: "0326393540",
                        address: "LNC",
                        email: result.userData.email,
                        password: password.value,
                        role: "user"
                    });
                    const userDoc = await firestore().collection('users').doc(email.value).get();
                    await dispatch({ type: LOGIN_HANDLE_EVENT, userData: userDoc._data });
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'CustomerScreen' }],
                    })
                } else {
                    await dispatch({ type: LOGIN_HANDLE_EVENT, userData: userDoc._data });
                    if (userDoc._data.role === "admin") {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Dashboard' }],
                        })
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'CustomerScreen' }],
                        })
                    }
                }




            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);


    }


    useEffect(() => {
        setEmail({ value: "ducln339@gmail.com", error: '' })
        setPassword({ value: "123456789Duc@@", error: '' })
    }, [])


    return (
        <Background>
            <BackButton goBack={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'StartScreen' }],
                })
            }} />
            <Logo />
            <Header>Welcome back.</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntryProp
            />
            {error ? <Text>{error}</Text> : null}
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button mode="contained" onPress={onLoginPressed}>
                    Login
                </Button>
            )}





            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </Background>


    );
}


const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})