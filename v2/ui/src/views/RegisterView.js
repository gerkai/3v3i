import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
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
    registerSection: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const RegisterView = () => {

    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('robertlaraiii@gmail.com');
    const [password, setPassword] = useState('Password123.');
    const [confirmPassword, setConfirmPassword] = useState('Password123.');
    const navigation = useNavigation();

    const handleRegisterPress = useCallback(async () => {

        ('Register Sent');
        await AuthenticationService.registerUser(name, email, password).then(async (response) => {

            navigation.replace('EmailVerificationSentView');

        }).catch((error) => {
            (error);
        });
        

    }, [navigation]);

    const openURL = () => {
        navigation.replace('LoginView');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputSection}>
                <TextInput
                    label="Name"
                    multiline={false}
                    value={name}
                    onChangeText={text => {
                        setName(text);
                    }}
                />
                <TextInput
                    label="Email"
                    multiline={false}
                    value={email}
                    onChangeText={text => {
                        setEmail(text);
                    }}
                />
                <TextInput
                    label="Password"
                    multiline={false}
                    secureTextEntry={true}
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
                    mode="contained" onPress={handleRegisterPress}>
                    Register
                </Button>


            </View>
            <View style={styles.registerSection}>
                <TouchableOpacity onPress={openURL}>
                    <Text style={styles.linkText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export { RegisterView }