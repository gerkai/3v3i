import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import StorageService from '../services/StorageService';
import uuid from 'react-native-uuid';

const styles = StyleSheet.create({
    addButton: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    addButtonText: {
        fontSize: 18,
    }
});

const AddSiteView = () => {

    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [attendeeFirstName, setAttendeeFirstName] = React.useState("");
    const [attendeeLastName, setAttendeeLastName] = React.useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();

    const createNewSite = async () => {

        const site = {
            id: uuid.v1(),
            name: name,
            address: address,
            attendeeFirstName: attendeeFirstName,
            attendeeLastName: attendeeLastName,
            date: date
        };

        StorageService.storeData(site.id, site).finally(() => {
            navigation.navigate('CreateSiteFeasibilityReportView', { siteId: site.id });
        });
        
    }

    return (
        <View>
            <TextInput
                label="Name"
                value={name}
                onChangeText={text => {
                    setName(text);
                }}
            />
            <TextInput
                label="Address"
                value={address}
                onChangeText={text => {
                    setAddress(text);
                }}
            />
            <TextInput
                label="First Name"
                value={attendeeFirstName}
                onChangeText={text => {
                    setAttendeeFirstName(text);
                }}
            />
            <TextInput
                label="Last Name"
                value={attendeeLastName}
                onChangeText={text => { 
                    setAttendeeLastName(text);
                }}
            />
            <TouchableOpacity onPress={() => {
                setOpen(true);
            }}>
                <TextInput
                    label="Date"
                    value={date.toLocaleDateString()}
                    editable={false}
                />
            </TouchableOpacity>
            {open &&
                (<DateTimePicker value={new Date()} display="calendar"
                    onChange={(event, date) => {
                        setDate(date);
                        setOpen(false);
                    }} />)
            }
            <Button style={styles.addButton} labelStyle={styles.addButtonText} mode="contained" onPress={createNewSite}>
                Add
            </Button>
        </View>
    )
}

export { AddSiteView };