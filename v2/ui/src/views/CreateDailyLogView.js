import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { TextInput } from 'react-native-paper';
import StorageService from '../services/StorageService';

const CreateDailyLogView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const [notes, setNotes] = useState('');
    const navigation = useNavigation();



    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });

    }, [route.params]);

    return (
        <View>
            <TextInput
                label="Notes"
                value={notes}
                onChangeText={text => {
                    setNotes(text);
                }}
            />
            <Button mode="contained" onPress={() => {

                const updatedSite = site;

                if (updatedSite?.DailyLogs === undefined) {
                    updatedSite.DailyLogs = [];
                }

                const dailyLog = {
                    created: new Date().toISOString(),
                    notes: notes
                }

                updatedSite.DailyLogs.push(dailyLog);


                StorageService.storeData(updatedSite.id, updatedSite).finally(() => {
                    navigation.navigate('SiteDetailsView', { siteId: updatedSite.id });
                });

            }}>
                Save
            </Button>
        </View>
    )
}

export { CreateDailyLogView };