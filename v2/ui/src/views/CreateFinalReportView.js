import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import StorageService from '../services/StorageService';
import { useNavigation } from '@react-navigation/core';
import { Button, TextInput } from 'react-native-paper';

const CreateFinalReportView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const [notes, setNotes] = useState('');
    const navigation = useNavigation();

    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [route.params])

    return (<View>
        <TextInput
            label="Notes"
            value={notes}
            onChangeText={text => {
                setNotes(text);
            }}
        />
        <Button mode="contained" onPress={() => {

            const updatedSite = site;

            if (updatedSite?.FinalReport === undefined) {
                updatedSite.FinalReport = {};
            }

            const finalReport = {
                created: new Date().toISOString(),
                notes: notes
            }

            updatedSite.FinalReport = finalReport;

            StorageService.storeData(updatedSite.id, updatedSite).finally(() => {
                navigation.navigate('SiteDetailsView', { siteId: updatedSite.id });
            });
        }}>
            Save
        </Button>
    </View>)
}

export { CreateFinalReportView }