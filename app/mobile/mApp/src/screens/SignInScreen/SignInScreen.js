import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, ToastAndroid, BackHandler, Button} from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import CustomInput from '../../components/CustomInput/CustomInput';

import CustomButton from '../../components/customButton/CustomButton';

import SocialSignInButtons from '../../SocialSignInButtons/SocialSignInButtons';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function SignInScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const route = useRoute();

    const ip = route.params.ip;

    const signInPress = async () => {

        if (userName === "") {
            ToastAndroid.show("Please enter an username!", 0.25);
            return;
        }
        if (password === "") {
            ToastAndroid.show("Please enter a password!", 0.25);
            return;
        }

        axios.post("http://" + ip + "/api/auth/login", {username: userName, password: password}, {withCredentials: true}).then(async () => {
            
            try {                
                ToastAndroid.show("Connected succefully!", 0.25);
                
                navigation.navigate("Home", {ip: ip});
            } catch (err) {

                ToastAndroid.show("An error has occured", 0.25);
            }

        }, (res) => {
            if (res.response.status == 401)
                ToastAndroid.show("Wrong username or password", 0.25);
            else
                ToastAndroid.show("An error has occured", 0.25);
        }).catch(() => {
            ToastAndroid.show("An error has occured", 0.25);
        }, []);    // Validate user
    }
    
    const editIp = () => {
        navigation.navigate('SetUpScreen');
    }

    const backFunction = () => {
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backFunction);
        }
    }, []);

    const signUp = () => {
        navigation.navigate('AreaCreateAccount', {
            ip: ip
        });
    }

    return (
        <View style={styles.root}>
            <View style={styles.titlePart}>
                <Text style={styles.title}>AREA<Text style={{color: "black", letterSpacing: 0, fontSize: 40}}>project</Text></Text>
            </View>
            <View style={styles.buttonsPart}>
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
                    bgColor={"#e6e6e6"}
                    newStyle={{text: {color: "black"}}}
                    text="Sign in" 
                    onPress={signInPress}
                />
                
                <SocialSignInButtons ip={ip} navigation={navigation} />
                
                <CustomButton
                    newStyle={{pressable: {marginTop: "6%"}}}
                    text="No account? Create one" 
                    onPress={signUp}
                    type="TERTIARY"
                />
            </View>

            <View style={styles.changeIpButton}>
                <CustomButton onPress={() => {editIp()}} text={"Edit IP"} bgColor={"#e6e6e6"} newStyle={{text: {color: "black"}}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
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

    titlePart: {
        marginTop: "15%",
        marginBottom: "5%",
        padding: 20,
    },
    title: {
        color: "rgb(160, 115, 202)",
        fontWeight: "bold",
        fontSize: 65,
        textAlign: "center",
        letterSpacing: 4,
    },
    secondTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        marginTop: 20,
    },

    buttonsPart: {
        width: "100%",
        padding: 20,
    },

    changeIpButton: {
        position: "absolute",
        bottom: "2%",
        right: "2%"
    },

});
