import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
    addButton: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    }
});

const InputPhoto = ({ label = '', questionPhotoData, siteId, photoId }) => {

    const navigation = useNavigation();

    const photoExist = (id) => {
        if (questionPhotoData === null || questionPhotoData === undefined) {
            return false;
        }
        const photo = questionPhotoData?.find(x => x.id === id);
        if (photo === undefined) {
            return true;
        }
        return false;
    }

    React.useEffect(() => {
        
    }, [siteId]);

    return (<View>
        <Text>
            { label }
        </Text>
        {photoExist(photoId) &&
            <Image source={{ uri: questionPhotoData[0].photoUri }} style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 20,
            }} />
        }
        {!photoExist(photoId) && <Button style={styles.addButton} labelStyle={styles.addButtonText} 
            icon="camera" mode="contained" onPress={() => {
            navigation.navigate('CameraView', { siteId: siteId, questionId: '001' });
        }}>
            Take Photo
        </Button>}
    </View>)
}

export { InputPhoto }