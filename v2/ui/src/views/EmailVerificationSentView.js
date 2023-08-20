import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const EmailVerificationSentView = () => {
    const navigation = useNavigation();
    const openURL = () => {
        navigation.replace('LoginView');
    };

    return (
        <View style={styles.container}>
            <Text>Verification Email Sent</Text>
            <TouchableOpacity onPress={openURL}>
                <Text style={styles.linkText}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export { EmailVerificationSentView };