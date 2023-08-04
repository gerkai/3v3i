import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorageService from '../services/StorageService';
import { TextInput,Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

const CreateSiteFeasibilityReportView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const [powerAvailability, setPowerAvailability] = React.useState(null);
    const [powerAvailabilityComments, setPowerAvailabilityComments] = React.useState(null);
    const navigation = useNavigation();

    const { siteId } = route.params;
    StorageService.retrieveData(siteId).then(data => {
        setSite(data)
    });

    React.useEffect(() => {
        

    }, [site]);

    return (
        <View>
            <Text>
                Power Availability
            </Text>
            <Text>
                Power Availability - Other (Comments)
            </Text>
            <TextInput
                label="Name"
                multiline={true}
                value={powerAvailabilityComments}
                onChangeText={text => {
                    setPowerAvailabilityComments(text);
                }}
            />
            <Button icon="plus" mode="contained" onPress={() => {

                const updatedSite = site;
                updatedSite.SiteFeasibilityReport = {};
                updatedSite.SiteFeasibilityReport.powerAvailabilityComments = powerAvailabilityComments;
                StorageService.storeData(updatedSite.id, updatedSite);
                navigation.navigate('HomeView');
            }}>
                Create
            </Button>
        </View>
    )
}

export { CreateSiteFeasibilityReportView }