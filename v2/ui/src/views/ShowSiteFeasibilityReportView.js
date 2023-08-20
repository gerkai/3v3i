import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import StorageService from '../services/StorageService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
    }
});

const ShowSiteFeasibilityReportView = ({ route }) => {

    const [site, setSite] = React.useState(null);

    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [route.params]);

    const downloadPDF = useCallback(() => {
    }, []);

    const emailPDF = useCallback(() => {
    }, []);

    return (<View style={styles.container}>
        <Button mode="contained" style={styles.button} onPress={downloadPDF} >
            View PDF
        </Button>
        <Button mode="contained" style={styles.button} onPress={emailPDF} >
            Email PDF
        </Button >
    </View>)
}

export { ShowSiteFeasibilityReportView }