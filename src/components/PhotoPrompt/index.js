import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './CameraView';
import PromptView from './PromptView';

const PhotoPrompt = ({currentId, setCurrentId}) => {
    const [picture, setPicture] = useState(null);

    return (
        <View style={styles.container}>
            <PromptView currentId={currentId} />
            <CameraView currentId={currentId} setCurrentId={setCurrentId} setPicture={setPicture} />
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
