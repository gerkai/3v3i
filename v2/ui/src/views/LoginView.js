import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
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

const LoginView = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLoginPress = useCallback(() => {
        navigation.replace('HomeView');
    }, [navigation]);

    const openURL = () => {
        navigation.replace('RegisterView');
    };

    const openTestURL = () => {
        navigation.replace('ResetPasswordView');
    };

    return (<View style={styles.container}>
        <View style={styles.inputSection}>
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

            <Button style={styles.addButton} labelStyle={styles.loginButton}
                mode="contained" onPress={handleLoginPress}>
                Login
            </Button>


        </View>
        <View style={styles.loginSection}>
            <TouchableOpacity onPress={openURL}>
                <Text style={styles.linkText}>
                    Register
                </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.loginSection}>
            <TouchableOpacity onPress={openTestURL}>
                <Text style={styles.linkText}>
                    Reset Password (Development Only)
                </Text>
            </TouchableOpacity>
        </View>
    </View>)
}

export { LoginView }