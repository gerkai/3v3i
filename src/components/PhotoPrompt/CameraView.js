import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Text, TouchableOpacity, View } from 'react-native';

let cameraRef;

const CameraView = ({ currentId, setCurrentId, setPicture }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);

    if (!permission)
        return <Text>Asking for camera permission</Text>;

    if (!permission.granted) {
        Camera.requestCameraPermissionsAsync();
        return <Text>Camera permission denied</Text>;
    }

    const takePicture = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            setPicture(photo);
            setCurrentId(currentId + 1);
        }
    }

    if (permission.granted) {
        return (
            <Camera style={{ flex: 1, }} type={type} ref={(ref) => { cameraRef = ref }} ratio="1:1" >
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', alignItems: 'center' }} onPress={() => takePicture()} >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Picture </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        );
    }
}

export default CameraView;