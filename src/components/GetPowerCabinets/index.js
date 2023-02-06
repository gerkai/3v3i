import React, { useContext, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import prompts from './prompts';
import PowerCabinetPhotoPrompts from './PowerCabinetPhotoPrompts';
import { PhotosContext } from '../../context/MyProviders';
import { useNavigation } from '@react-navigation/native';

const GetPowerCabinets = ({ navigateTo }) => {
    const { addPhoto } = useContext(PhotosContext);
    const navigation = useNavigation();
    const [currentCabinetComplete, setCurrentCabinetComplete] = useState(true);
    const [counter, setCounter] = useState(0);

    const handleAddAnother = () => {
        setCurrentCabinetComplete(false);
        setCounter(counter + 1);
    }

    return (
        <View style={styles.container}>
            {currentCabinetComplete ? (
                <View>
                    <Text>Add a Power Cabinet?</Text>
                    <Button title={"Yes"} onPress={handleAddAnother} />
                    <Button title={"No"} onPress={() => navigation.navigate(navigateTo)} />
                </View>
            ) : (
                <PowerCabinetPhotoPrompts cabinetNumber={counter} prompts={prompts} addPhoto={addPhoto} setComplete={setCurrentCabinetComplete} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GetPowerCabinets;