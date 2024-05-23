import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import { TextInput, StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, ToastAndroid, BackHandler} from 'react-native';
import axios from 'axios';
import { SelectProvider, Select } from '@mobile-reality/react-native-select-pro';
import CustomButton from '../../components/customButton/CustomButton';

export default function AREAForm(props) {
    const [areaName, setAreaName] = useState("");

    const [actionServiceName, setActionServiceName] = useState("");
    const [actionName, setActionName] = useState("");
    const [reactionServiceName, setReactionServiceName] = useState("");
    const [reactionName, setReactionName] = useState("");

    const [servicesList, setServicesList] = useState([]);
    const [servicesOptions, setServicesOptions] = useState([]);
    const [actionsOptions, setActionsOptions] = useState([]);
    const [reactionsOptions, setReactionsOptions] = useState([]);
    const [actionSelectIsDisabled, setActionSelectIsDisabled] = useState(true);
    const [reactionSelectIsDisabled, setReactionSelectIsDisabled] = useState(true);

    const navigation = useNavigation();
    const route = useRoute();

    const ip = route.params.ip;
    const updateAreaList = route.params.updateAreaList;

    const actionSelectRef = useRef();
    const reactionSelectRef = useRef();

    const backFunction = () => {
        navigation.navigate("Home", {
            ip: ip
        });
        return true;
    };
    
    useEffect(() => {
        axios.get("http://" + ip + "/api/services/", {withCredentials: true}).then((res) => {
            if (!res.data) {
                toast.error("An error has occured");
                ToastAndroid.show("An error has occured", 0.25);
                return;
            }
            setServicesList(res.data);
            setServicesOptions(processServicesOptions(res.data));
        }).catch(() => {
            ToastAndroid.show("An error has occured", 0.25);
        });
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backFunction);
        }
    }, []);

    const processServicesOptions = (list) => {
        let options = [];
        for (let el of list)
            options.push({ value: el.name, label: el.name.charAt(0).toUpperCase() + el.name.slice(1) });
        return options;
    };

    const createArea = () => {
        if (areaName === "")
            return ToastAndroid.show("AREA name is empty !", 0.25);
        if (actionServiceName === "" || actionName === "" || reactionServiceName === "" || reactionName === "")
            return ToastAndroid.show("One or more field(s) are empty !", 0.25);
        axios.post("http://" + ip + "/api/areas/", {
            areaName: areaName,
            actionService: actionServiceName,
            actionLabel: actionName,
            reactionService: reactionServiceName,
            reactionLabel: reactionName,
        }).then(() => {
            ToastAndroid.show("AREA created", 0.25);
            updateAreaList();
            backFunction();
        }).catch(() => {
            ToastAndroid.show("An error has occured", 0.25);
        });
    };

    const processOptions = (value, type) => {
        let options = [];
        let serviceEl;
        for (let el of servicesList) {
            if (el.name === value)
                serviceEl = el;
        }
        for (let el of (type === "action") ? serviceEl.actions : serviceEl.reactions)
            options.push({ value: el, label: el});
        if (type === "action") {
            setActionServiceName(value);
            setActionsOptions(options);
            setActionSelectIsDisabled(false);
        } else {
            setReactionServiceName(value);
            setReactionsOptions(options);
            setReactionSelectIsDisabled(false);
        }
    };

    return (
        <SelectProvider>

            <Text style={styles.firstTitle} >CREATE <Text style={styles.secondTitle} >YOUR AREA</Text></Text>

            <View style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                <Text style={styles.areaNameTitle} >Name your AREA :</Text>
                <TextInput style={styles.areaNameInput} onChangeText={setAreaName} value={areaName} secureTextEntry={false}/>
            </View>

            <View style={styles.seviceActionPart}>
                <View style={styles.selectPart}>
                    <Text style={styles.actionReactionTitle}>SERVICE</Text>
                    <Select clearable={false} options={servicesOptions} onSelect={(choice) => {processOptions(choice.value, "action"); if (actionSelectRef.current) { actionSelectRef.current.clear();}}} placeholderText={"Choose a service"} searchable={false}></Select>
                </View>
                <View style={styles.selectPart}>
                    <Text style={styles.actionReactionTitle}>ACTION</Text>
                    <Select ref={actionSelectRef} clearable={false} options={actionsOptions} onSelect={(choice) => {setActionName(choice.value)}} placeholderText={(actionsOptions.length !== 0) ? "Choose an action" : "No actions exist for this service"} searchable={false} disabled={(actionSelectIsDisabled || actionsOptions.length === 0)}></Select>
                </View>
            </View>

            <View style={styles.seviceReactionPart}>
                <View style={styles.selectPart}>
                    <Text style={styles.actionReactionTitle}>SERVICE</Text>
                    <Select clearable={false} options={servicesOptions} onSelect={(choice) => {if (reactionSelectRef.current) { reactionSelectRef.current.clear();} processOptions(choice.value, "reaction");}} placeholderText={"Choose a service"} searchable={false}></Select>
                </View>
                <View style={styles.selectPart}>
                    <Text style={styles.actionReactionTitle}>REACTION</Text>
                    <Select ref={reactionSelectRef} clearable={false} options={reactionsOptions} onSelect={(choice) => {setReactionName(choice.value);}} placeholderText={(reactionsOptions.length !== 0) ? "Choose a reaction" : "No reactions exist for this service"} searchable={false} disabled={(reactionSelectIsDisabled || reactionsOptions.length === 0)}></Select>
                </View>
            </View>
            <View style={styles.buttonCreate}>
                <CustomButton onPress={() => {createArea()}} text={"Create"} bgColor={"#d7d7d7"} newStyle={{text: {color: "black"}}}/>
            </View>
            <View style={styles.buttonCancel}>
                <CustomButton onPress={() => {backFunction()}} text={"Cancel"} bgColor={"#d7d7d7"} newStyle={{text: {color: "black"}}}/>
            </View>
        </SelectProvider>
    );

}

const styles = StyleSheet.create({

    buttonCreate: {
        width: "80%",
        marginTop: "10%", marginBottom: "2%",
        marginLeft: "auto", marginRight: "auto",
        display: "flex",
        justifyContent: "center",
        borderRadius: 30,
        color: "black",
    },

    buttonCancel: {
        width: "80%",
        marginLeft: "auto", marginRight: "auto",
        display: "flex",
        justifyContent: "center",
        borderRadius: 30,
        color: "black",
    },

    firstTitle: {
        marginTop: "15%", marginBottom: 40,
        textAlign: "center",
        color: "rgb(160, 115, 202)",
        fontSize: 35,
        fontWeight: "bold"
    },

    secondTitle: {
        color: "black",
    },

    areaNameTitle: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },

    areaNameInput: {
        width: "80%",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(160,115,202,1)",
        borderEndColor: "rgba(170,115,210,0.2)",
    },

    actionReactionTitle: {
        fontWeight: 'bold',
        marginBottom: 10, marginTop: 10,
    },

    seviceActionPart: {
        marginBottom: "10%",
        marginTop: "10%",
    },

    seviceReactionPart: {
        marginTop: "10%",
    },

    selectPart: {
        paddingLeft: "10%", paddingRight: "10%",
    }

});