import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './CameraView';
import PromptView from './PromptView';

const Prompt = ({ prompt, example, setPicture }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: '100%' }}>
                <PromptView prompt={prompt} example={example} />
            </View>
            <View style={{ flex: 1, width: '100%' }}>
                <CameraView setPicture={setPicture} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Prompt;