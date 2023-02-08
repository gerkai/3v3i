import React, { useContext, useState } from 'react';
import { View, Linking } from 'react-native';
import { Button, Paragraph, Dialog, Portal, ActivityIndicator } from 'react-native-paper';
import { AllFormInputsContext, PhotosContext } from '../../context/MyProviders';
import { createDocument, uploadFormInputs, uploadPhotos } from './helperFunctions';

const CreateHTMLDocument = () => {
    const { allFormInputs } = useContext(AllFormInputsContext);
    const { photos } = useContext(PhotosContext);

    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        await uploadFormInputs(allFormInputs);
        await uploadPhotos(photos);
        const url = await createDocument();
        setUrl(url);
        setLoading(false);
    };

    const handleOpenUrl = () => {
        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Paragraph style={{ textAlign: 'center', marginBottom: 20 }}>
                Once created, you can open the document, share a link with someone, or print it.
            </Paragraph>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    <Button mode="contained" onPress={handleCreate}>
                        Create Document
                    </Button>
                    {url && (
                        <Button onPress={handleOpenUrl}>Open Document</Button>
                    )}
                </>
            )}
        </View>
    );
};

export default CreateHTMLDocument;
