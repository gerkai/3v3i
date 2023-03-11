import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Title } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { PhotosContext } from '../../context/MyProviders';

const LogoUpload = () => {
    const { addPhoto, photos } = useContext(PhotosContext);
    const [selectedFilename, setSelectedFilename] = useState(null);

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
            });
            if (result.type === "success") {
                const photo = {
                    uri: result.uri,
                    fileName: result.name,
                    constant: true,
                    promptKey: 'logo'
                };
                addPhoto(photo);
                setSelectedFilename(result.name);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Title>If you want to use a logo you have already uploaded, you can continue without picking a logo again</Title>
            <Button mode="contained" onPress={handleFileUpload}>
                Upload Logo
            </Button>
            {selectedFilename && (
                <Text>Selected file: {selectedFilename}</Text>
            )}
        </View>
    );
};

export default LogoUpload;
