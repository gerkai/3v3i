import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './CameraView';
import PromptView from './PromptView';

const PhotoPrompt = ({ currentId, setPicture }) => {
    return (
        <View style={styles.container}>
            <PromptView currentId={currentId} />
            <CameraView setPicture={setPicture} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default PhotoPrompt;
