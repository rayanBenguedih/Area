import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Button, ToastAndroid, BackHandler, Alert, Touchable, Pressable} from 'react-native';
import CustomButton from '../../components/customButton/CustomButton';
import AreaDisplayer from '../../components/HomeScreen/AreaDisplayer';

export default function HomeScreen() {
    
    const [username, setUsername] = useState("");
    const [areaList, setAreaList] = useState([]);
    const [updateAreaList, setUpdateAreaList] = useState(false);
    
    const route = useRoute();
    const navigation = useNavigation();
    
    const ip = route.params.ip;

    const backFunction = () => {
        return true;
    };

    const changeUpdateAreaList = () => {
        setUpdateAreaList(!updateAreaList);
    };

    useEffect(() => {
        axios.get("http://" + ip + "/api/areas/", {withCredentials: true}).then((res) => {
          if (res.data)
            setAreaList(res.data);
        }).catch((err) => {

        });
    }, [updateAreaList]);

    useEffect(() => {
        axios.post("http://" + ip + "/api/auth/islogin", {}, {withCredentials: true}).then((res) => {
          if (res.status === 200 || res.status === 302)
            setUsername(res.data.user.username);
        }).catch((err) => {
          if (err.response.status === 401) {
            ToastAndroid.show("You're not logged in!", 0.25);
            navigation.navigate("AreaLogin", {
                ip: ip
            });
          }
        });
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backFunction);
        }
    }, []);

    const goToAreaForm = () => {
      navigation.navigate("AreaForm", {
        ip: ip,
        updateAreaList: () => {changeUpdateAreaList()},
      });
    }

    const styles = StyleSheet.create({
        root: {
            flex: 1,
        },
    
        addArea: {
            width: 60,
            height: 60,
            borderRadius: 20,
            position: "absolute",
            right: "5%",
            bottom: 0,
            zIndex: 2,
        },

        logoutButton: {
            width: 100,
            height: 70,
            borderRadius: 30,
            position: "absolute",
            right: "3%",
            top: "7%",
            color: "black",
            zIndex: 2,
        },
    });

    return (
        <View style={styles.root}>
            <AreaDisplayer username={username} changeUpdateAreaList={changeUpdateAreaList} areaList={areaList} ip={ip} />
            <View style={styles.addArea}>
                <CustomButton onPress={() => {goToAreaForm()}} text={"+"} bgColor={"#d7d7d7"} newStyle={{text: {fontSize: 15, color: "black"}, pressable: {display: "flex", justifyContent: "center", alignItems: "center"}}} ></CustomButton>
            </View>
        </View>
    )

}
