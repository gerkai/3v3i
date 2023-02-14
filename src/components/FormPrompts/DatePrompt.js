import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const DatePrompt = ({ prompt, handleChange, inputs }) => {
    const [date, setDate] = useState(inputs[prompt.key] ? new Date(inputs[prompt.key]) : new Date());
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        if(showDate)
            handleChange(prompt.key, date.toDateString());
        if(!showDate)
            handleChange(prompt.key, '');
    }, [date, showDate]);

    return (
        <View style={{ padding: 20, marginRight: 'auto' }}>
            <Title>{prompt.prompt}</Title>
            <TouchableOpacity onPress={() => setShowDate(!showDate)}>
                <Text>{showDate ? 'Leave Date Blank' : 'Select Date'}</Text>
            </TouchableOpacity>
            {showDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={false}
                    onChange={(event, selectedDate) => {
                        setDate(selectedDate);
                    }}
                />
            )}
        </View>
    );
};

export default DatePrompt;
