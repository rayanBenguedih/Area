import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Text, View, ScrollView, StyleSheet, Pressable, ToastAndroid, Touchable, BackHandler, Linking} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/customButton/CustomButton';

export default function SetUpScreen() {

    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [fullAddress, setFullAddress] = useState('');

    const navigation = useNavigation();

    const backFunction = () => {
        navigation.navigate("Home", {
            ip: fullAddress
        })
        return true;
    };

    const saveNewIp = async () => {
        try {
            const newFullAddress = ip + ":" + port;
            
            await AsyncStorage.setItem('ipAddress', newFullAddress);
            
            await setFullAddress(newFullAddress);
            
            navigation.navigate("Home", {
                ip: newFullAddress
            })
            return true;

        } catch (e) {
            ToastAndroid.show("An error has occured!", 0.25);
        }
    }

    const getExistingIp = async () => {
        try {
            const oldIp = await AsyncStorage.getItem('ipAddress');

            if (!oldIp) {
                setFullAddress("0.0.0.0:0000");
                return "0.0.0.0:0000";
            }
            
            const oldFullAddress = oldIp.split(':');

            setIp(oldFullAddress[0]);
            setPort(oldFullAddress[1]);

            setFullAddress(oldIp);

            return oldIp;

        } catch (e) {
            ToastAndroid.show("An error has occured!", 0.25);
        }        
    }

    useEffect(() => {
        getExistingIp();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backFunction);
        }
    }, []);

    return (
        <ScrollView>
            <View style={styles.ipContainer}>
                <Text style={styles.ipTitle}>Configure your IPaddress</Text>
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
            </View>
            <View>

            </View>
            <View style={{padding: 20}}>
                <Text style={styles.ipTitle}>Configure services accounts:</Text>
                <CustomButton text={"Discord"} type={"PRIMARY"} fgColor={'white'} bgColor={"#5662F6"} onPress={() => {}} />
                <Pressable style={{alignItems: "center"}} onPress={() => {Linking.openURL("https://discord.com/api/oauth2/authorize?client_id=1028960882899828746&permissions=139586500672&scope=bot")}}><Text style={{textAlign: "center", textDecorationLine: "underline"}}>Think to add the bot to your server</Text></Pressable>
            </View>

            <View style={{padding: 20}}>
                <CustomButton newStyle={{pressable: {marginTop: "10%"}}} text={"Apply"} type={"PRIMARY"} fgColor={'black'} bgColor={"#e6e6e6"} onPress={() => {saveNewIp()}} />
                <CustomButton text={"Cancel"} type={"PRIMARY"} fgColor={'black'} bgColor={"#e6e6e6"} onPress={() => {backFunction()}} />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    ipContainer: {
        marginTop: "15%",
        padding: 20,
        display: "flex",
        alignItems: "center",
    },
    ipTitle: {
        marginBottom: "5%",
        textAlign: "center",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 18,
    }

});