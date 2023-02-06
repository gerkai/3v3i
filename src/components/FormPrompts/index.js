import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { AllFormInputsContext } from '../../context/MyProviders';
import FormInput from './FormInput';

const FormPrompts = ({ prompts, navigateTo }) => {
    const { addFormInputs } = useContext(AllFormInputsContext);

    const navigation = useNavigation();
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
        addFormInputs(inputs)
        navigation.navigate(navigateTo)
    };

    return (
        <ScrollView>
            {prompts.map((prompt, index) => (
                <FormInput key={index} prompt={prompt} handleChange={handleChange} inputs={inputs} />
            ))}
            <Button
                style={{ padding: 20 }}
                disabled={isButtonDisabled}
                onPress={handleContinue}>
                Continue
            </Button>
        </ScrollView>
    );
}

export default FormPrompts;