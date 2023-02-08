import React from 'react';
import { View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import RadioPrompt from './RadioPrompt';
import CheckboxPrompt from './CheckboxPrompt';
import DatePrompt from './DatePrompt';

const FormInput = ({ prompt, handleChange, inputs }) => {
    if (prompt.type === 'radio') {
        return <RadioPrompt prompt={prompt} handleChange={handleChange} inputs={inputs} />;
    } else if (prompt.type === 'checkbox') {
        return <CheckboxPrompt prompt={prompt} handleChange={handleChange} inputs={inputs} />;
    } else if (prompt.type === 'date') {
        return <DatePrompt prompt={prompt} handleChange={handleChange} inputs={inputs} />;
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
