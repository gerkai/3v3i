import React, { useContext, useState } from 'react';
import Prompt from '../Prompt';
import { PhotosContext } from '../../context/MyProviders';
import { useNavigation } from '@react-navigation/native';

const ConstantPhotoPrompts = ({ prompts, navigateTo }) => {
    const { addPhoto } = useContext(PhotosContext)
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const currentPrompt = prompts[index];

    const fileName = 'constant_' + currentPrompt.key;

    const handleTakePhoto = (photo) => {
        const newPhoto = { ...photo, constant: true, promptKey: currentPrompt.key, fileName: fileName };
        addPhoto(newPhoto);
        if (index + 1 < prompts.length) {
            setIndex(index + 1);
        } else {
            navigation.navigate(navigateTo)
        }
    }

    return <Prompt prompt={currentPrompt.prompt} example={currentPrompt.example} setPicture={handleTakePhoto} />
}

export default ConstantPhotoPrompts;