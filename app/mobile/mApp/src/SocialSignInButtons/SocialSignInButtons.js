import React from 'react';
import {View, Text, Linking} from 'react-native'
import CustomButton from '../components/customButton/CustomButton';

export default function SocialSignInButton(props) {
    const signInGoogle = () => {
        Linking.openURL("http://" + props.ip + "/api/auth/mobile/google");
    }

    return (
        <>
            <CustomButton 
                text="Sign in with Google" 
                onPress={signInGoogle}
                type="TERTIARY"
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
            
        </>
    );
}
