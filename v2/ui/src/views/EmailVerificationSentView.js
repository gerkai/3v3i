import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AuthenticationService from '../services/AuthenticationService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const EmailVerificationSentView = () => {

    const [activationCode, setActivationCode] = useState('');
    const navigation = useNavigation();
    const openURL = () => {
        navigation.replace('LoginView');
    };

    const handleLoginPress = useCallback( async () => {

        await AuthenticationService.activateUser(activationCode).then(async (response) => {
            ('response:' + response.token);
            navigation.replace('LoginView');
        }).catch((error) => {
            (error);
        });

    }, [activationCode, navigation]);

    return (
        <View style={styles.container}>
            <Text>Check your email for an activation code.</Text>
            <TextInput
                label="Verification Code"
                multiline={false}
                value={activationCode}
                style={{ width: '100%' }}
                onChangeText={text => {
                    setActivationCode(text);
                }}
            />

            <Button style={styles.addButton} labelStyle={styles.loginButton}
                mode="contained" onPress={handleLoginPress}>
                Activate Account
            </Button>
            <TouchableOpacity onPress={openURL}>
                <Text style={styles.linkText}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export { EmailVerificationSentView };