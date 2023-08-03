import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorageService from '../services/StorageService';

const CreateSiteFeasibilityReportView = ({ route }) => {
    const { siteId } = route.params;

    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [site])

    return (
        <View>
            <Text>
                {siteId}
            </Text>
        </View>
    );
};

export { CreateSiteFeasibilityReportView };