import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LogoUploader from '../components/LogoUploader';

const LogoUploaderScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LogoUploader />
            <Button mode="contained" style={{ marginTop: 8 }} onPress={() => navigation.navigate('Title')}>Continue</Button>
        </View>
    );
};

export default LogoUploaderScreen;
