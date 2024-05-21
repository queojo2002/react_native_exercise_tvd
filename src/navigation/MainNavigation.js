import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { AddNewServicesScreen, CustomerScreen, Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen, ServicesDetailScreen, StartScreen } from '../screens';
import UpdateServicesScreen from '../screens/users/UpdateServicesScreen';

const Stack = createNativeStackNavigator()
export default function MainNavigation() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.userData);

    return (


        <NavigationContainer>
            {!isAuthenticated ?
                <Stack.Navigator initialRouteName='StartScreen' screenOptions={{ headerShown: false, }} >
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                </Stack.Navigator>
                : user.role === 'admin' ? (
                    <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false, }} >
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="ServicesDetailScreen" component={ServicesDetailScreen} />
                        <Stack.Screen name="AddNewServicesScreen" component={AddNewServicesScreen} />
                        <Stack.Screen name="UpdateServicesScreen" component={UpdateServicesScreen} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator initialRouteName='CustomerScreen' screenOptions={{ headerShown: false, }} >
                        <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    );
}
