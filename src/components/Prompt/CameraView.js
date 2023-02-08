import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Caption, Surface } from 'react-native-paper';

let cameraRef;

const CameraView = ({ setPicture }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [disabled, setDisabled] = useState(false);

    if (!permission)
        return <Text>Asking for camera permission</Text>;

    if (!permission.granted) {
        Camera.requestCameraPermissionsAsync();
        return <Text>Camera permission denied</Text>;
    }

    const takePicture = async () => {
        if (cameraRef) {
            setDisabled(true);
            let photo = await cameraRef.takePictureAsync({ base64: true });
            setPicture(photo);
            setDisabled(false);
        }
    }

    if (permission.granted) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Camera style={{ width: '90%', height: '90%' }} type={CameraType.back} ref={(ref) => { cameraRef = ref }} ratio="1:1" >
                    <View style={{ flex: 1, backgroundColor: 'transparent' }} />
                    <View style={{ margin: 10 }}>
                        <Button mode="contained" disabled={disabled} onPress={() => takePicture()}>
                            Take Picture
                        </Button>
                    </View>
                </Camera>

            </View>
        );
    }
}

export default CameraView;