import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AuthenticationService from '../services/AuthenticationService';
import TokenService from '../services/TokenService';

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
        paddingTop: 25,
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

const LoginView = ({ activationToken = null }) => {

    const [userActivated, setUserActivated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    React.useEffect(() => {
        if (activationToken) {
            AuthenticationService.activateUser(activationToken).then(() => {
                setUserActivated(true);
            }).catch((error) => {
                (error);
            });
        }
    }, [activationToken]);

    const handleLoginPress = useCallback(async () => {

        await AuthenticationService.loginUser(email, password).then(async (response) => {

            if(response.token !== ''){
                await TokenService.storeToken(response.token).finally(() => {
                    navigation.replace('HomeView');
                });
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [email, password, navigation]);

    const registerPress = useCallback(async () => {
        navigation.navigate('RegisterView');
    }, []);

    const resetPasswordPress = useCallback(async () => {
        navigation.navigate('ResetPasswordRequestView');
    }, []);

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

            {userActivated && <Text style={styles.linkText}>
                Your account has been activated. You may now login.
            </Text>}

        </View>
        <View style={styles.loginSection}>
            <TouchableOpacity onPress={registerPress}>
                <Text style={styles.linkText}>
                    Register
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetPasswordPress}>
                <Text style={styles.linkText}>
                    Reset Password
                </Text>
            </TouchableOpacity>
        </View>
    </View>)
}

export { LoginView }