import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const DatePrompt = ({ prompt, handleChange, inputs }) => {
    const date = inputs[prompt.key] ? new Date(inputs[prompt.key]) : new Date();

    useEffect(() => {
        handleChange(prompt.key, date.toDateString())
    }, [prompt.key])

    return (
        <View style={{ padding: 20, marginRight: 'auto' }}>
            <Title>{prompt.prompt}</Title>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={false}
                onChange={(event, selectedDate) => {
                    handleChange(prompt.key, selectedDate.toDateString());
                }}
            />
        </View>
    );
};

export default DatePrompt;
