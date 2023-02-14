// src/components/DocumentActions.js

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const DocumentActions = ({ onCreate, url, onOpen }) => {
    return (
        <View>
            <Button mode="contained" onPress={onCreate}>
                Create Document
            </Button>
            {url && <Button onPress={onOpen}>Open Document</Button>}
        </View>
    );
};

export default DocumentActions;
