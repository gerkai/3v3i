import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const LandingPage = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Welcome to Punchlist Pro</Text>
            <Button mode="contained" style={{ marginTop: 8 }} onPress={() => navigation.navigate('Title')}>Start</Button>
        </View>
    );
};

export default LandingPage;
