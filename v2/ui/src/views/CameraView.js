import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/core';
import PhotoUrlService from '../services/PhotoUrlService';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraContainer: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    photoButton: {
      position: 'absolute',
      bottom: 20,
      zIndex: 10,
    },
  });

const CameraView = ({ route }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [siteId, setSiteId] = useState(null);
    const [questionId, setQuestionId] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const { siteId, questionId } = route.params;
        setSiteId(siteId);
        setQuestionId(questionId);
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [route.params]);

    const takePhoto = useCallback(async () => {
        if (cameraRef) {
          const photo = await cameraRef.takePictureAsync();
          setCapturedPhoto(photo);
          setShowPreview(true);
        }
      }, [cameraRef]);
    
      const usePhoto = useCallback(async () => {
        if (capturedPhoto) {
          await PhotoUrlService.storePhotoUrl(siteId, questionId, capturedPhoto.uri);
          navigation.navigate('CreateSiteFeasibilityReportView', {
            siteId: siteId,
          });
        }
      }, [capturedPhoto, siteId, questionId, navigation]);

    return (
        <View style={styles.container}>
            {!showPreview && <Camera
                style={styles.cameraContainer}
                type={Camera.Constants.Type.back}
                ref={(ref) => setCameraRef(ref)}
            />}
            {!showPreview && <Button style={styles.photoButton} icon="camera" onPress={takePhoto} 
            mode="contained" disabled={!hasPermission} >Take Photo</Button>
            }
            {showPreview && <Image source={{ uri: capturedPhoto.uri }} style={{ width: 300, height: 300 }} />}
            {showPreview && <Button style={styles.photoButton} icon="plus" onPress={usePhoto} 
            mode="contained" disabled={!hasPermission} >Use Photo</Button>
            }
        </View>
    )
}

export { CameraView }