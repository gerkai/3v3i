import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import StorageService from '../services/StorageService';
import PdfService from '../services/PdfService';
import { useNavigation } from '@react-navigation/core';
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
    const [email, setEmail] = React.useState('');
    const navigation = useNavigation();

    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [route.params]);

    const downloadPDF = useCallback(async () => {

        await PdfService.DownloadPdf(site).then(async (response) => {
            ('ok2');
        }).catch((error) => {
            (error);
        });

    }, [site]);

    const emailPDF = useCallback(async () => {

        await PdfService.SendPdf(site, email).then(async (response) => {
            ('pdf sent');
        }).catch((error) => {
            (error);
        });

    }, [site, email]);

    const deleteSite = useCallback(async () => {
        StorageService.removeData(site.id).then(() => {
            navigation.replace('HomeView');
        }).catch((error) => {
            (error);
        });
    }, [site]);

    return (<View style={styles.container}>

        <TextInput
            label="Email"
            multiline={false}
            value={email}
            style={{width: '100%'}}
            onChangeText={text => {
                setEmail(text);
            }}
        />
        <Button mode="contained" style={styles.button} onPress={downloadPDF} >
            View PDF
        </Button>
        <Button mode="contained" style={styles.button} onPress={emailPDF} >
            Email PDF
        </Button >
        <Button style={styles.addButton} labelStyle={styles.addButtonText}
            mode="contained" onPress={deleteSite}>
            Delete Site
        </Button>
    </View>)
}

export { ShowSiteFeasibilityReportView }