import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage } from '../redux/actions/authAction';
import { AddNewServicesScreen, CustomerScreen, Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen, ServicesDetailScreen, StartScreen } from '../screens';
import UpdateServicesScreen from '../screens/users/UpdateServicesScreen';

const Stack = createNativeStackNavigator()
export default function MainNavigation() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.userInfo);
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            await dispatch(loadUserFromStorage());
            setLoading(false);
        };

        fetchUserData();
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            if (user.userData) {
                if (user.userData.role === 'admin') {
                    setInitialRoute('Dashboard');
                } else if (user.userData.role === 'user') {
                    setInitialRoute('CustomerScreen');
                } else {
                    setInitialRoute('StartScreen');
                }
            } else {
                setInitialRoute('StartScreen');
            }
        }
    }, [loading, user.userData]);

    if (loading || !initialRoute) {
        return <ActivityIndicator />;
    }

    return (
        <NavigationContainer>
        {console.log(initialRoute)}
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="ServicesDetailScreen" component={ServicesDetailScreen} />
                <Stack.Screen name="AddNewServicesScreen" component={AddNewServicesScreen} />
                <Stack.Screen name="UpdateServicesScreen" component={UpdateServicesScreen} />
                <Stack.Screen name="CustomerScreen" component={CustomerScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
