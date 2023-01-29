import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import prompts from '../prompts';

const ConstantPhotoPrompts = ({ photos, setPhotos, setComplete }) => {
    const [index, setIndex] = useState(0);
    const currentPrompt = prompts[index];

    const handleTakePhoto = (photo) => {
        addPhoto(photo);
        if (index + 1 < prompts.length) {
            setIndex(index + 1);
        } else {
            setComplete(true);
        }
    }

    return <Prompt prompt={currentPrompt.prompt} example={currentPrompt.example} setPicture={handleTakePhoto} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ConstantPhotoPrompts;