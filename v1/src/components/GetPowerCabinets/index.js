import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import prompts from './prompts';
import PowerCabinetPhotoPrompts from './PowerCabinetPhotoPrompts';
import { PhotosContext } from '../../context/MyProviders';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


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
        <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
            {currentCabinetComplete ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <Text>Add a Power Cabinet?</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Button mode="contained" style={{ marginRight: 10 }} onPress={handleAddAnother}>
                            Yes
                        </Button>
                        <Button mode="contained" onPress={() => navigation.navigate(navigateTo)}>
                            No
                        </Button>
                    </View>
                </View>
            ) : (
                <PowerCabinetPhotoPrompts cabinetNumber={counter} prompts={prompts} addPhoto={addPhoto} setComplete={setCurrentCabinetComplete} />
            )}
        </View>
    );
}

export default GetPowerCabinets;