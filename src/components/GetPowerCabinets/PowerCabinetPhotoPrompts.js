import React, { useState } from 'react';
import Prompt from '../Prompt';

const PowerCabinetPhotoPrompts = ({ cabinetNumber, prompts, addPhoto, setComplete }) => {
    const [index, setIndex] = useState(0);
    const currentPrompt = prompts[index];

    const fileName = 'powercabinet_' + currentPrompt.key + '_' + cabinetNumber;

    const handleTakePhoto = (photo) => {
        const newPhoto = { ...photo, powercabinet: true, cabinetNumber: cabinetNumber, promptKey: currentPrompt.key, fileName: fileName };
        addPhoto(newPhoto);
        if (index + 1 < prompts.length) {
            setIndex(index + 1);
        } else {
            setComplete(true);
        }
    }

    return <Prompt prompt={currentPrompt.prompt} example={currentPrompt.example} setPicture={handleTakePhoto} />
}

export default PowerCabinetPhotoPrompts;