import React from 'react'
import {Text, View, TextInput, StyleSheet} from 'react-native'

export default function CustomInput({value, setValue, placeholder, secureTextEntry}) {
    return (
        <View style = {styles.container}>
            <TextInput 
                value = {value}
                onChangeText = {setValue}
                placeholder = {placeholder}
                secureTextEntry = {secureTextEntry}
                style = {styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 2,
        borderRadius: 10,

        padding: 10,

        paddingHorizontal: 20,

        marginVertical: 10,
    },
    input: {
    },
})
