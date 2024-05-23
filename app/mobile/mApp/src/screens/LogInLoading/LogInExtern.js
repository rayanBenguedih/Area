import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react'
import {Text, View, ScrollView, StyleSheet, Pressable, ToastAndroid, Touchable, BackHandler} from 'react-native'

export default function LogInExtern() {
    
    const route = useRoute();
    const navigation = useNavigation();

    const saveExternalDatas = async () => {

        try {
            
            ToastAndroid.show("Connected succefully!", 0.25);
            
            navigation.navigate("Home", {ip: ip});
        } catch (err) {

            ToastAndroid.show("An error has occured", 0.25);
        }

    };

    useEffect(() => {

        saveExternalDatas();

    }, []);

    return (
        <View>

        </View>
    )

}