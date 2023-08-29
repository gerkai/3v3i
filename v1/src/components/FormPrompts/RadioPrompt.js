import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RadioButton, Title } from 'react-native-paper';

const RadioPrompt = ({ prompt, handleChange, inputs }) => (
    <View style={{ padding: 20 }}>
        <Title>{prompt.prompt}</Title>
        {prompt.options.map((option, optionIndex) => (
            <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleChange(prompt.key, option)}>
                    <Text>{option}</Text>
                </TouchableOpacity>
                <RadioButton
                    value={option}
                    status={inputs[prompt.key] === option ? 'checked' : 'unchecked'}
                    onPress={() => handleChange(prompt.key, option)}
                />
            </View>
        ))}
    </View>
);

export default RadioPrompt;