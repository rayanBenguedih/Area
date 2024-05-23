import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, ToastAndroid, BackHandler} from 'react-native';

import CustomInput from '../../components/CustomInput/CustomInput';

import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../components/customButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SetUpScreen() {
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');

    const navigation = useNavigation();
    const route = useRoute();

    const getExistingIp = async () => {
        try {
            const oldIp = await AsyncStorage.getItem('ipAddress');

            if (!oldIp)
                return "0.0.0.0:0000";
            
            const fullAddress = oldIp.split(':');

            setIp(fullAddress[0]);
            setPort(fullAddress[1]);

            return oldIp;

        } catch (e) {
            ToastAndroid.show("An error has occured!", 0.25);
        }        
    }
    
    useEffect(() => {
        getExistingIp();
    }, []);

    const storeIPAddress = async (value) => {
        try {
            await AsyncStorage.setItem('ipAddress', value);
            ToastAndroid.show("Ip is correctly entered!", 0.25);
            navigation.navigate("AreaLogin", {
                ip: value,
            });
        } catch (e) {
            ToastAndroid.show("An error has occured!", 0.25);
        }
      }

    const goToApp = () => {
        if (ip === "" || port === "") {
            ToastAndroid.show("Please enter a correct ip and port!", 0.25);
            return;
        }

        const allIP = ip + ":" + port;

        storeIPAddress(allIP);
    }

    const backFunction = () => {
        if (route.name === "LoadingScreen")
            BackHandler.exitApp();
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backFunction);
        }
    }, []);

    return (
        <View>
            <View style={styles.titlePart}>
                <Text style={styles.title}>AREA<Text style={{color: "black", letterSpacing: 0, fontSize: 40}}>project</Text></Text>
                <Text style={styles.secondTitle} >Interconnect services and build your personnal Action-Reaction environment</Text>
            </View>
            <View style={styles.root}>
                <Text style={{textDecorationLine: "underline"}}>To begin, enter your IP Adress and your port</Text>

                <CustomInput 
                    placeholder="IP address" 
                    value = {ip} 
                    setValue = {setIp}
                    secureTextEntry = {false}
                />
                <CustomInput 
                    placeholder="Port" 
                    value = {port} 
                    setValue = {setPort}
                    secureTextEntry = {false}
                />        
                <CustomButton newStyle={{pressable: {marginTop: "10%"}}} text={"Apply"} type={"PRIMARY"} fgColor={'black'} bgColor={"#e6e6e6"} onPress={() => {goToApp()}} />
            </View >

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
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
