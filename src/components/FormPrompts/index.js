import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { prompts } from './prompts';
import { Button, TextInput, Title } from 'react-native-paper';

const FormPrompts = ({ setAllFormInputs }) => {
    const initialInputs = prompts.reduce((acc, cur) => {
        acc[cur.key] = '';
        return acc;
    }, {});
    const [inputs, setInputs] = useState(initialInputs);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (key, value) => {
        setInputs({ ...inputs, [key]: value });
    };

    const checkIfAllInputsAreFilled = () => {
        const values = Object.values(inputs);
        const isAllInputsFilled = values.every(value => value !== undefined && value !== '');
        setIsButtonDisabled(!isAllInputsFilled);
    };

    useEffect(() => {
        checkIfAllInputsAreFilled();
    }, [inputs]);

    const handleContinue = () => {
        setAllFormInputs(inputs)
    };

    return (
        <ScrollView>
            {prompts.map((prompt, index) => (
                <View key={index} style={{ padding: 20 }}>
                    <Title>{prompt.prompt}</Title>
                    <TextInput
                        value={inputs[prompt.key]}
                        onChangeText={(text) => handleChange(prompt.key, text)}
                    />
                </View>
            ))}
            <Button
                style={{ padding: 20 }}
                disabled={isButtonDisabled}
                onPress={handleContinue}>
                Continue
            </Button>
        </ScrollView >
    );
};

export default FormPrompts;