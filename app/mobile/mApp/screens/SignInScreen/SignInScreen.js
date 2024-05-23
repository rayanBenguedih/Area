import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView} from 'react-native';

import Logo from '../../../assets/Logo_1.png';
import CustomInput from '../../components/CustomInput/CustomInput';

import CustomButton from '../../components/customButton/CustomButton';


const signInPress = () => {
    console.warn("Sign in");
}

const signUp = () => {
    console.warn("Sign up");
}

const signInGoogle = () => {
    console.warn("Sign in with google");
}

const signInFacebook = () => {
    console.warn("Sign in with google");
}

export default function SignInScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const {height} = useWindowDimensions();
    
    return (
        <ScrollView>
            <View style={styles.root}>
                <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>

                <CustomInput 
                    placeholder="Username" 
                    value = {userName} 
                    setValue = {setUserName}
                    secureTextEntry = {false}
                />
                <CustomInput 
                    placeholder="Password" 
                    value = {password} 
                    setValue = {setPassword}
                    secureTextEntry = {true}
                />
        
                <CustomButton
                    text="Sign in" 
                    onPress={signInPress}
                />
                
                <CustomButton
                    text="Forgot Password" 
                    onPress={forgodPasswordPress}
                    type="TERTIARY"
                />
                
                <CustomButton 
                    text="Sign in with Google" 
                    onPress={signInGoogle}
                    type="TERTIARY"
                    bgColor="FAE9EA"
                    fgColor="#DD4D44"
                />
                
                <CustomButton 
                    text="Sign in with Facebook" 
                    onPress={signInFacebook} 
                    type="TERTIARY"
                    bgColor="E7EAF4"
                    fgColor="#4765A9"
                />
                
                <CustomButton
                    text="No account? Create one" 
                    onPress={signUp}
                    type="TERTIARY"
                />
        
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200
    },
});
