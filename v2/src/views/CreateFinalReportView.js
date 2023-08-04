import React, { useState, useEffect, useCallback } from 'react';
import {View, Text} from 'react-native';
import StorageService from '../services/StorageService';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native-paper';

const CreateFinalReportView = ({ route }) => {
    const [site, setSite] = React.useState(null);
    const navigation = useNavigation();
    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [route.params])

    return(<View>
        <Text>Create Final Report View</Text>
        <Button mode="contained" onPress={() => {
                    navigation.navigate('HomeView');
                }}>
                    Save
                </Button>
    </View>)
}

export {CreateFinalReportView}