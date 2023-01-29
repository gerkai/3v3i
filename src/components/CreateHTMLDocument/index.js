import React, { useState } from 'react';
import { View, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { createDocument, uploadFormInputs, uploadPhotos } from './helperFunctions';

const CreateHTMLDocument = ({ allFormInputs, photos }) => {
    const [url, setUrl] = useState(null);

    const handleCreate = async () => {
        await uploadPhotos(photos);
        await uploadFormInputs(allFormInputs);
        const url = await createDocument();
        setUrl(url);
    };

    const handleOpenUrl = () => {
        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!url && <Button mode="contained" onPress={handleCreate}>Create HTML Document</Button>}
            {url && <Button onPress={handleOpenUrl}>Open HTML Document</Button>}
        </View>
    );
};

export default CreateHTMLDocument;

