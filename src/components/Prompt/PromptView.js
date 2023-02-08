import React from 'react';
import { Image, View } from 'react-native';
import { Text, Title } from 'react-native-paper';

const PromptView = ({ prompt, example }) => {
    return (
        <View style={{ padding: 20, margin: 20 }}>
            <Title style={{ textAlign: 'center' }}>{prompt}</Title>
            <Image source={example} style={{ width: '100%', height: '90%', resizeMode: 'contain' }} />
        </View>
    );
}

export default PromptView;