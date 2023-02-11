import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
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

    console.log(inputs)

    const checkIfAllInputsAreFilled = () => {
        const values = Object.values(inputs);
        const isAllInputsFilled = values.every(value => value !== undefined && value !== '');
        //setIsButtonDisabled(!isAllInputsFilled);
        setIsButtonDisabled(false); //for now let users not fill in fields
    };

    useEffect(() => {
        checkIfAllInputsAreFilled();
    }, [inputs]);

    const handleContinue = () => {
        console.log(inputs)
        addFormInputs(inputs)
        navigation.navigate(navigateTo)
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={130}>
                <ScrollView style={{ width: '100%' }}>
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
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );
}

export default FormPrompts;