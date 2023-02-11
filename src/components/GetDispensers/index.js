import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { PhotosContext } from '../../context/MyProviders';
import DispenserPhotoPrompts from './DispenserPhotoPrompts';
import { promptsD, prompts1D } from './prompts';
import { Button } from 'react-native-paper';

const GetDispensers = ({ type, navigateTo }) => {
    const { addPhoto } = useContext(PhotosContext);
    const navigation = useNavigation();
    const [currentDispenserComplete, setCurrentDispenserComplete] = useState(true);
    const [counter, setCounter] = useState(0);

    let prompts;
    if (type == 'D') prompts = promptsD;
    else if (type == '1D') prompts = prompts1D;

    const handleAddAnother = () => {
        setCurrentDispenserComplete(false);
        setCounter(counter + 1);
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
            {currentDispenserComplete ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    {type === 'D' ? <Text>Add D type all-in-one dispenser?</Text> : <Text>Add 1D type stand alone dispenser</Text> }
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
                <DispenserPhotoPrompts type={type} dispenserNumber={counter} prompts={prompts} addPhoto={addPhoto} setComplete={setCurrentDispenserComplete} />
            )}
        </View>
    );

}

export default GetDispensers;