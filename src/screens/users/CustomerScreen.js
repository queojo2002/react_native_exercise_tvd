import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';

const CustomerScreen = ({ navigation }) => {
    const user = useSelector(state => state.userInfo.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'StartScreen' }],
            });
        }
    }, [user, navigation]);

    if (!user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text>Test sử dụng lấy dữ liệu Redux</Text>
            <Text>Xin chào {user.name}</Text>

            <TouchableOpacity onPress={() => dispatch(logout())}>
                <Text style={{ color: 'red' }}>Nhấn vào đây để Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default CustomerScreen;
