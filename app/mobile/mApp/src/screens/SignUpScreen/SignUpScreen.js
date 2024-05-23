import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, ToastAndroid, BackHandler} from 'react-native';
import axios from 'axios';

import CustomInput from '../../components/CustomInput/CustomInput';

import CustomButton from '../../components/customButton/CustomButton';

import SocialSignInButtons from '../../SocialSignInButtons/SocialSignInButtons';


import { useNavigation, useRoute } from '@react-navigation/native';

export default function SignUpScreen() {
    const [userName, setUserName] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    
    const navigation = useNavigation();

    const route = useRoute();

    const ip = route.params.ip;

    const registerPressed = () => {
        if (userName === "") {
            ToastAndroid.show("Please enter an username!", 0.25);
            return;
        }
        if (password === "") {
            ToastAndroid.show("Please enter a password!", 0.25);
            return;
        }
        if (eMail === "") {
            ToastAndroid.show("Please enter an email!", 0.25);
            return;
        }
        if (passwordRepeat !== password) {
            ToastAndroid.show("Please enter same passwords!", 0.25);
            return;
        }

        axios.post("http://" + ip + "/api/auth/signup", {username: userName, password: password, email: eMail}, {withCredentials: true}).then(() => {
            ToastAndroid.show("Successfully registered !", 0.25);
            navigation.navigate('AreaLogin', {
                ip: ip
            });
        }).catch((err) => {
            ToastAndroid.show("An error has occured", 0.25);
        });
    }
    
    const backFunction = () => {
        navigation.navigate('AreaLogin', {
            ip: ip
        });
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backFunction);
        }
    }, []);

    const onSignInPress = () => {
        navigation.navigate("AreaLogin", {
            ip: ip
        })
    }
    
    const editIp = () => {
        navigation.navigate('SetUpScreen');
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
                    placeholder="E-mail" 
                    value = {eMail} 
                    setValue = {setEmail}
                    secureTextEntry = {false}
                />

                <CustomInput 
                    placeholder="Password" 
                    value = {password} 
                    setValue = {setPassword}
                    secureTextEntry = {true}
                />

                <CustomInput 
                    placeholder="Repeat Password" 
                    value = {passwordRepeat} 
                    setValue = {setPasswordRepeat}
                    secureTextEntry = {true}
                />
                
                <CustomButton
                    bgColor={"#e6e6e6"}
                    newStyle={{text: {color: "black"}}}
                    text="Register" 
                    onPress={registerPressed}
                />
                
                <SocialSignInButtons />

                <CustomButton
                    newStyle={{pressable: {marginTop: "6%"}}}
                    text="Got an account? Sign in" 
                    onPress={onSignInPress}
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
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
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
