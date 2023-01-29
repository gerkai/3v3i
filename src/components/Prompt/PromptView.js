import React from 'react';
import { Image } from 'react-native';
import { Surface, Caption } from 'react-native-paper';

const PromptView = ({ prompt, example }) => {
    return (
        <Surface style={{ padding: 20, margin: 20, flex: 1 }}>
            <Caption style={{ textAlign: 'center' }}>{prompt}</Caption>
            <Image source={example} style={{ width: '100%', resizeMode: 'contain' }} />
        </Surface>
    );
}

export default PromptView;    