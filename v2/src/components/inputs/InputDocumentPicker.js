import React, { useState } from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const InputDocumentPicker = ({ label = '' , getter, setter}) => {

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            if (result.type === 'success') {
                setter(prevDocs => [...prevDocs, result]);
            } else {
                console.log("User cancelled document selection.");
            }
        } catch (error) {
            console.error("An error occurred while picking the document:", error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{label}</Text>
            <Button title="Pick a Document" onPress={pickDocument} />

            <ScrollView style={{ marginTop: 20, width: '90%' }}>
                {getter.map((doc, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                        <Text>Name: {doc.name}</Text>
                        {
                        //<Text>Size: {doc.size} bytes</Text>
                        //<Text>Type: {doc.type}</Text>
                        //<Text>URI: {doc.uri}</Text>
                        }
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export { InputDocumentPicker }
