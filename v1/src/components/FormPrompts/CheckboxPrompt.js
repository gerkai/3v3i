import React from 'react';
import { View } from 'react-native';
import { Checkbox, Title } from 'react-native-paper';

const CheckboxPrompt = ({ prompt, handleChange, inputs }) => (
    <View style={{ padding: 20 }}>
        <Title>{prompt.prompt}</Title>
        <Checkbox
            status={inputs[prompt.key] ? 'checked' : 'unchecked'}
            onPress={() => handleChange(prompt.key, !inputs[prompt.key])}
        />
    </View>
);

export default CheckboxPrompt;
