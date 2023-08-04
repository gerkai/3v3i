import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import StorageService from '../services/StorageService';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10
    },
    text: {
        fontWeight: 'bold'
    }
});

const SiteDetailsView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const [siteProgress, setSiteProgress] = React.useState('');
    const navigation = useNavigation();

    React.useEffect(() => {

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const { siteId } = route.params;
            StorageService.retrieveData(siteId).then(data => {
                setSite(data);

                if (data?.SiteFeasibilityReport === undefined) {
                    setSiteProgress('not-started');
                }

                if (data?.SiteFeasibilityReport !== undefined && data?.FinalReport === undefined) {
                    setSiteProgress('in-progress');
                }

                if (data?.SiteFeasibilityReport !== undefined && data?.FinalReport !== undefined) {
                    setSiteProgress('complete');
                }

            });

            return () => {

            };
        }, [route.params])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{site?.name}</Text>
            <Text style={styles.text}>{site?.address}</Text>
            <Text style={styles.text}>{site?.attendeeFirstName} {site?.attendeeLastName}</Text>
            <Text style={styles.text}>{site?.date}</Text>
            <Text style={styles.text}>Status: {site?.SiteFeasibilityReport === undefined ? 'Not Started' : (site?.FinalReport === undefined ? 'In Progress' : 'Complete')}</Text>
            {(siteProgress === 'not-started') &&
                (<Button mode="contained" onPress={() => {
                    navigation.navigate('CreateSiteFeasibilityReportView', { siteId: site?.id });
                }}>
                    Create Site Feasibility Report
                </Button>)
            }
            {(siteProgress === 'in-progress') &&
                (<Button mode="contained" onPress={() => {
                    navigation.navigate('CreateDailyLogView', { siteId: site?.id });
                }}>
                    Create Daily Log
                </Button>)
            }
            {(siteProgress === 'in-progress') &&
                (<Button mode="contained" onPress={() => {
                    navigation.navigate('CreateFinalReportView', { siteId: site?.id });
                }}>
                    Create Final Report
                </Button>)
            }
            {(siteProgress === 'complete') &&
                (<FlatList
                    data={site?.DailyLogs}
                    renderItem={({ item }) => <Text>{item.notes} {item.created}</Text>}
                />)
            }
        </View>
    )
}

export { SiteDetailsView }