// src/components/CreateHTMLDocument.js

import React, { useContext, useState } from 'react';
import { View, Linking } from 'react-native';
import { Paragraph, ProgressBar } from 'react-native-paper';
import { AllFormInputsContext, PhotosContext } from '../../context/MyProviders';
import { createHTMLDocument } from './helperFunctions';
import LoadingSpinner from '../LoadingSpinner';
import DocumentActions from '../DocumentActions';

const CreateHTMLDocument = () => {
    const { allFormInputs } = useContext(AllFormInputsContext);
    const { photos } = useContext(PhotosContext);

    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleCreate = async () => {
        setLoading(true);
        const url = await createHTMLDocument(allFormInputs, photos, (progress) => {
            setUploadProgress(progress);
        });
        setUrl(url);
        setLoading(false);
    };

    const handleOpenUrl = () => {
        setUploadProgress(0);
        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
                <>
                    <LoadingSpinner />
                    <View style={{ width: '50%' }}>
                        <ProgressBar style={{ margin: 20 }} progress={uploadProgress} />
                    </View>
                </>
            ) : (
                <>
                    <Paragraph style={{ textAlign: 'center', marginBottom: 20 }}>
                        Once created, you can open the document, share a link with someone, or print it.
                    </Paragraph>
                    <DocumentActions onCreate={handleCreate} url={url} onOpen={handleOpenUrl} />
                </>
            )}
        </View>
    );
};

export default CreateHTMLDocument;
