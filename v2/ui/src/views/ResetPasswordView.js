import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

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

const ResetPasswordView = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleResetPasswordPress = useCallback(() => {
        navigation.replace('HomeView');
    }, [navigation]);

    return(<View style={styles.container}>
        <View style={styles.inputSection}>
            <TextInput
                label="Password"
                multiline={false}
                value={password}
                onChangeText={text => {
                    setPassword(text);
                }}
            />
            <TextInput
                label="Confirm Password"
                multiline={false}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => {
                    setConfirmPassword(text);
                }}
            />
            <Button style={styles.addButton} labelStyle={styles.loginButton}
                mode="contained" onPress={handleResetPasswordPress}>
                Reset Password
            </Button>
        </View>
    </View>)
}

export {ResetPasswordView}