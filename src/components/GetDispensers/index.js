import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import DispenserPhotoPrompts from './DispenserPhotoPrompts';
import { promptsD, prompts1D } from './prompts';

const GetTypeDDispensers = ({ type, addPhoto, setComplete }) => {
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
        <View style={styles.container}>
            {currentDispenserComplete ? (
                <View>
                    <Text>Add a Type {type} Dispenser?</Text>
                    <Button title={"Yes"} onPress={handleAddAnother} />
                    <Button title={"No"} onPress={() => setComplete(true)} />
                </View>
            ) : (
                <DispenserPhotoPrompts type={type} dispenserNumber={counter} prompts={prompts} addPhoto={addPhoto} setComplete={setCurrentDispenserComplete} />
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

export default GetTypeDDispensers;