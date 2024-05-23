import React from 'react'
import axios from 'axios';
import {Text, View, ScrollView, StyleSheet, Pressable, ToastAndroid, Touchable} from 'react-native'
import CustomButton from '../../customButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AreaDisplayer({username, changeUpdateAreaList, areaList, ip})
{

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        textWelcome: {
            fontSize: 21,
            fontWeight: "bold",
            color: "rgb(160, 115, 202)",
        },

        textUsername: {
            textDecorationLine: "underline",
            fontStyle: "italic",
            fontSize: 21,
            fontWeight: "bold", 
            color: "black"   
        },

        areaElement: {
            backgroundColor: "#e8e8e8",
            width: "90%",
            borderRadius: 12,
            marginLeft: "auto", marginRight: "auto",
            padding: 10,
            marginTop: "4%",
            marginBottom: "4%",
        },

        areaTitle: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginLeft: "5%", marginRight: "5%", marginTop: 2,
        },

        areaTitleText: {
            fontSize: 18,
            fontWeight: "bold",
        },

        areaActionReaction: {
            marginTop: 20,
            marginRight: 'auto', marginLeft: "auto",
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },

        areaActionReactionText: {
            fontSize: 15,
            fontWeight: "bold",
        },

        logoutButton: {
            marginLeft: "2%", marginRight: "2%",
        },
    });

    const openSettings = () => {
        navigation.navigate("Settings", {
            ip: ip
        })
    }

    const logout = () => {
        axios.post("http://" + ip + "/api/auth/logout", {}, {withCredentials: true}).then(async (res) => {
            
            try {

                ToastAndroid.show("Succefully logout!", 0.25);

                navigation.navigate("AreaLogin", {
                    ip: ip
                });

            } catch (err) {
                console.log(err);
            }

        }).catch((err) => {
            console.log(err);
        })
    };
    
    const deleteArea = (e) => {
        const id = e.id;

        axios.delete("http://" + ip + `/api/areas/${id}`, {withCredentials: true}).then(() => {
          ToastAndroid.show("Area deleted !", 0.25);
          changeUpdateAreaList();
        }).catch(() => {
          ToastAndroid.show("An error has occured", 0.25);
        });
    };

    const displayAllAreas = areaList.map((element, index) => {
        return (
            <View style={styles.areaElement} key={index}>
                <View style={styles.areaTitle}>
                    <Text style={styles.areaTitleText}>{element.areaName}</Text>
                    <Pressable style={{width: 20, height: 20}} onPress={() => {deleteArea(element)}}><Text style={styles.areaTitleText}>X</Text></Pressable>
                </View>
                <View>
                    <View style={styles.areaActionReaction}>
                        <Text style={styles.areaActionReactionText}>{element.actionService}</Text>
                        <Text style={{fontSize: 15}}>{element.actionLabel}</Text>
                    </View>
                    <View style={styles.areaActionReaction}>
                        <Text style={styles.areaActionReactionText}>{element.reactionService}</Text>
                        <Text style={{fontSize: 15}}>{element.reactionLabel}</Text>
                    </View>
                </View>
            </View>
        )
    });

    return (
        <ScrollView>
            <View style={{marginTop: "19%", marginLeft: "5%", display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "space-around"}}>
                <Text style={styles.textWelcome}>
                    {"Welcome "}
                    <Text style={styles.textUsername}>{username}</Text>
                </Text>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={styles.logoutButton}>
                        <CustomButton onPress={openSettings} text={"Settings"} bgColor={"#d7d7d7"} newStyle={{text: {color: "black"}}}/>
                    </View>
                    <View style={styles.logoutButton}>
                        <CustomButton onPress={logout} text={"Logout"} bgColor={"#d7d7d7"} newStyle={{text: {color: "black"}}}/>
                    </View>
                </View>
            </View>
            {displayAllAreas}
        </ScrollView>
    )
}