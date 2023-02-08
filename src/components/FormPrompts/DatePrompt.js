import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import moment from "moment";

const DatePrompt = ({ prompt, handleChange, inputs }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const date = inputs[prompt.key] ? new Date(inputs[prompt.key].date) : new Date();

    return (
        <View style={{ padding: 20 }}>
            <Title>{prompt.prompt}</Title>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text>{moment(date).format("MMMM Do YYYY")}</Text>
            </TouchableOpacity>
            <DatePickerModal
                //locale="de"
                mode="single"
                visible={showDatePicker}
                onDismiss={() => setShowDatePicker(false)}
                date={date}
                onConfirm={(date) => {
                    handleChange(prompt.key, date);
                    setShowDatePicker(false);
                }}
            />
        </View>
    );
};

export default DatePrompt;
