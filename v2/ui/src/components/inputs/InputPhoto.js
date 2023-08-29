import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import PhotoUrlService from '../../services/PhotoUrlService';
import { useFocusEffect } from '@react-navigation/native';
const styles = StyleSheet.create({
    addButton: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    }
});

const InputPhoto = ({ label = '', siteId, photoId }) => {

    const [photoUri, setPhotoUri] = useState(null);
    const [photoExist, setPhotoExist] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            const fetchPhotoUrl = async () => {
                const photoUri = await PhotoUrlService.getPhotoUrl(siteId, photoId);
                if (photoUri !== null) {
                    setPhotoUri(photoUri);
                    setPhotoExist(true);
                }
            };

            fetchPhotoUrl();
        }, [siteId, photoId])
    );

    return (<View>
        <Text>
            {label} {photoUri}
        </Text>
        {photoExist &&
            <Image source={{ uri: photoUri }} style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 20,
            }} />
        }
        {!photoExist && <Button style={styles.addButton} labelStyle={styles.addButtonText}
            icon="camera" mode="contained" onPress={() => {
                navigation.navigate('CameraView', { siteId: siteId, questionId: photoId });
            }}>
            Take Photo
        </Button>}
    </View>)
}

export { InputPhoto }