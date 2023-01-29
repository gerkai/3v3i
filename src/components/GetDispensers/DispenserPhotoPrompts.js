import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from '../Prompt/CameraView';
import PromptView from '../Prompt/PromptView';
import Prompt from '../Prompt';

const DispenserPhotoPrompts = ({ type, dispenserNumber, prompts, addPhoto, setComplete }) => {
    const [index, setIndex] = useState(0);
    const currentPrompt = prompts[index];

    const fileName = 'dispenser_' + type + '_' + currentPrompt.key + '_' + dispenserNumber;

    const handleTakePhoto = (photo) => {
        const newPhoto = { ...photo, dispenser: true, type: type, dispenserNumber: dispenserNumber, promptKey: currentPrompt.key, fileName: fileName };
        addPhoto(newPhoto);
        if (index + 1 < prompts.length) {
            setIndex(index + 1);
        } else {
            setComplete(true);
        }
    }

    return <Prompt prompt={currentPrompt.prompt} example={currentPrompt.example} setPicture={handleTakePhoto} />
}

export default DispenserPhotoPrompts;