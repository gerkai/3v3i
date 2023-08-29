import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AuthenticationService from '../services/AuthenticationService';
const styles = StyleSheet.create({
    registerButton: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSection: {
        flex: .5,
        width: '100%',
    },
    loginSection: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
const ResetPasswordRequestView = () => {

    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleResetPasswordRequestPress = useCallback(() => {

        AuthenticationService.requestPasswordReset(email).then(async (response) => {
            navigation.replace('ResetPasswordView');
        }).catch((error) => {
            (error);
        });
        
    }, [email,navigation]);

    return (
        <View style={styles.container}>
        <View style={styles.inputSection}>
        <Text>Reset Password Request</Text>
        <TextInput
                label="Email"
                multiline={false}
                value={email}
                onChangeText={text => {
                    setEmail(text);
                }}
            />
            <Button style={styles.addButton} labelStyle={styles.loginButton}
                mode="contained" onPress={handleResetPasswordRequestPress}>
                Reset Password
            </Button>
        </View>
    </View>
    );
};

export { ResetPasswordRequestView };