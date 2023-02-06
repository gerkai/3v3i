import React, { useContext, useState } from 'react';
import { View, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { AllFormInputsContext, PhotosContext } from '../../context/MyProviders';
import { createDocument, uploadFormInputs, uploadPhotos } from './helperFunctions';

const CreateHTMLDocument = () => {
    const { allFormInputs } = useContext(AllFormInputsContext);
    const { photos } = useContext(PhotosContext);
    
    const [url, setUrl] = useState(null);

    const handleCreate = async () => {
        await uploadFormInputs(allFormInputs);
        await uploadPhotos(photos);
        const url = await createDocument();
        setUrl(url);
    };

    const handleOpenUrl = () => {
        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {true && <Button mode="contained" onPress={handleCreate}>Create HTML Document</Button>}
            {url && <Button onPress={handleOpenUrl}>Open HTML Document</Button>}
        </View>
    );
};

export default CreateHTMLDocument;

