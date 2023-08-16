import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { InputText } from '../inputs/InputText';
import { Button } from 'react-native-paper';

const InputStationTypes = () => {

    const [newType, setNewType] = useState({
        type: '',
        quantity: 0,
        size: '',
    });

    const [types, setTypes] = useState([]);

    const setQuantity = (value) => {
        setNewType({
            ...newType,
            quantity: value
        })
    };

    const setType = (value) => {
        setNewType({
            ...newType,
            type: value
        })
    };

    const setSize = (value) => {
        setNewType({
            ...newType,
            size: value
        })
    };

    const sizeOptions = ['50kW', '75kW', '100kW', '150kW', '175kW', '350kW', '32A', '40A', '50A', '80A']
    const typeOptions = ['DCFC', 'L2'];

    const handleCreatePress = useCallback(() => {
        console.log(types);
        const newTypes = [...types, newType];
        setTypes(newTypes);
        setNewType({
            type: 'DCFC',
            quantity: 0,
            size: '50kW',
        })

    }, [types, newType]);

    return (
        <View>
            <Picker
                selectedValue={newType.type}
                onValueChange={(itemValue, itemIndex) =>
                    setType(itemValue)
                }>
                {
                    typeOptions.map((option, index) => {
                        return <Picker.Item key={index} label={option} value={option} />
                    })
                }
            </Picker>
            <InputText label="Quantity" getter={newType.quantity} setter={setQuantity} />
            <Picker
                selectedValue={newType.size}
                onValueChange={(itemValue, itemIndex) =>
                    setSize(itemValue)
                }>
                {
                    sizeOptions.map((option, index) => {
                        return <Picker.Item key={index} label={option} value={option} />
                    })
                }
            </Picker>
            <Button mode="contained" onPress={handleCreatePress}>
                Add
            </Button>
            {
                types.map((type, index) => {
                    return (<Text key={index}>{type.type} {type.quantity} {type.size}</Text>)
                })
            }
        </View>
    )
}

export { InputStationTypes }