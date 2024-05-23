import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Button, ToastAndroid, BackHandler, Alert, Touchable, Pressable} from 'react-native';
import react, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoadingScreen() {

    const navigation = useNavigation();

    const checkInformations = async () => {
        try {
            const ipAddress = await AsyncStorage.getItem("ipAddress");

            if (!ipAddress) {
                navigation.navigate("SetUpScreen");
                return;
            }

            axios.post("http://" + ipAddress + "/api/auth/islogin", {}, {timeout: 1000, withCredentials: true}).then(() => {

                navigation.navigate("Home", {
                    ip: ipAddress,
                });
                return;

            }).catch((err) => {
                if (!err.response) {
                    navigation.navigate("SetUpScreen")
                } else {
                    navigation.navigate("AreaLogin", {
                        ip: ipAddress
                    })
                }
            });

        } catch(err) {
            console.log("dqsdsqdsqqds");
            navigation.navigate("SetUpScreen");
            return;
        }
    }

    useEffect(() => {
        setTimeout(() => {

            checkInformations();

        }, 1000);
    });

    return (
        <View style={styles.root}>
            <Text style={styles.title}>AREA<Text style={{color: "black", letterSpacing: 0, fontSize: 40}}>project</Text></Text>
            <Text style={{color: "black", fontWeight: "bold", marginTop: -10}}>an Epitech project</Text>
        </View>
    );

}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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


});