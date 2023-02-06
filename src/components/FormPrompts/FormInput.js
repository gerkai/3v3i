import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Checkbox, RadioButton, TextInput, Title } from 'react-native-paper';

const FormInput = ({ prompt, handleChange, inputs }) => {
    if (prompt.type === 'radio') {
        return (
            <View style={{ padding: 20 }}>
                <Title>{prompt.prompt}</Title>
                {prompt.options.map((option, optionIndex) => (
                    <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value={option}
                            status={inputs[prompt.key] === option ? 'checked' : 'unchecked'}
                            onPress={() => handleChange(prompt.key, option)}
                        />
                        <TouchableOpacity onPress={() => handleChange(prompt.key, option)}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    } else if (prompt.type === 'checkbox') {
        return (
            <View style={{ padding: 20 }}>
                <Title>{prompt.prompt}</Title>
                <Checkbox
                    status={inputs[prompt.key] ? 'checked' : 'unchecked'}
                    onPress={() => handleChange(prompt.key, !inputs[prompt.key])}
                />
            </View>
        );
    }
    return (
        <View style={{ padding: 20 }}>
            <Title>{prompt.prompt}</Title>
            <TextInput
                value={inputs[prompt.key]}
                onChangeText={(text) => handleChange(prompt.key, text)}
            />
        </View>
    );
};

export default FormInput;
