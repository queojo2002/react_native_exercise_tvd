import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';

const CustomerScreen = () => {
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Text>Test sử dụng lấy dữ liệu Redux</Text>
            {user && user.name && <Text>Xin chào {user.name}</Text>}
            <TouchableOpacity onPress={ async () => await dispatch(logout())}>
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
