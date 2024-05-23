import React from 'react'
import {Text, View, TextInput, StyleSheet, Pressable} from 'react-native'


export default function CustomButton({onPress, newStyle, text, type="PRIMARY", bgColor, fgColor})
{
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`], 
                bgColor ? {backgroundColor: bgColor} : {},
                (newStyle !== undefined) ? newStyle.pressable : {}
            ]}
        >
            <Text 
                style={[
                    styles.textStyle, 
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {},
                    (newStyle !== undefined) ? newStyle.text : {}
                    ]}>
                {text}
            </Text>       
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,

        alignItems: 'center',

        padding: 15,
        marginVertical: 5,

    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',

    },

    container_TERTIARY: {

    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 1,

    },

    text_SECONDARY: {
        color: 'blue',
    },

    textStyle: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'gray',
    },
})