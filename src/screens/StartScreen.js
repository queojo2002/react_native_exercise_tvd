import React from 'react'
import { Background, Logo, Header, Button, Paragraph } from '../components'



export default StartScreen = ({ navigation }) => {
    return (
        <Background>
            <Logo />
            <Header>Start Screen</Header>
            <Paragraph>
                Đây là màn hình khi khởi động ứng dụng.
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreen')}
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Sign Up
            </Button>
        </Background>
    )
}