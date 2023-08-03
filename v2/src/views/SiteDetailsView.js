import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorageService from '../services/StorageService';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

const SiteDetailsView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const navigation = useNavigation();

    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [site])

    return (
        <View>
            <Text>{site?.name}</Text>
            <Text>{site?.address}</Text>
            <Text>{site?.attendeeFirstName} {site?.attendeeLastName}</Text>
            <Text>{site?.date}</Text>
            <Text>Status: {site?.SiteFeasibilityReport === undefined ? 'Not Started' : 'In Progress'}</Text>
            <Button mode="contained" onPress={() => {
                navigation.navigate('CreateSiteFeasibilityReportView',{ siteId: site?.id });
            }}>
                Create Site Feasibility Report
            </Button>
        </View>
    )
}

export { SiteDetailsView }