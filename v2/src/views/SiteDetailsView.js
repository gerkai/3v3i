import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import StorageService from '../services/StorageService';
import { Button, PaperProvider, Portal, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { NotesCard } from '../components/domain-inputs/NotesCard';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10
    },
    text: {
        fontWeight: 'bold'
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        flex: .5,
        marginLeft: 10,
        marginRight: 10
    }
});

const SiteDetailsView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const [note, setNote] = React.useState(null);
    const [siteProgress, setSiteProgress] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {

    }, [visible, note])

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

    const showModal = (note) => {
        setNote(note);
        setVisible(true);
        console.log('Show Modal Fired');
    }
    const hideModal = () => {
        setNote(null);
        setVisible(false);
    }

    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} dismissable={true} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text>{note && note.created}</Text>
                    <Text>{note && note.notes}</Text>
                </Modal>
            </Portal>
            <View style={styles.container}>
                <Text style={styles.text}>{site?.name}</Text>
                <Text style={styles.text}>{site?.address}</Text>
                <Text style={styles.text}>{site?.attendeeFirstName} {site?.attendeeLastName}</Text>
                <Text style={styles.text}>{site?.date}</Text>
                <Text style={styles.text}>Status: {site?.SiteFeasibilityReport === undefined ? 'Not Started' : (site?.FinalReport === undefined ? 'In Progress' : 'Complete')}</Text>
                {(siteProgress !== 'not-started') &&
                    (<Button style={styles.button} mode="contained" onPress={() => {
                        navigation.navigate('CreateSiteFeasibilityReportView', { siteId: site?.id });
                    }}>
                        Show Site Feasibility Report
                    </Button>)}
                {(siteProgress === 'not-started') &&
                    (<Button style={styles.button} mode="contained" onPress={() => {
                        navigation.navigate('CreateSiteFeasibilityReportView', { siteId: site?.id });
                    }}>
                        Create Site Feasibility Report
                    </Button>)
                }
                {(siteProgress === 'in-progress') &&
                    (<Button style={styles.button} mode="contained" onPress={() => {
                        navigation.navigate('CreateDailyLogView', { siteId: site?.id });
                    }}>
                        Create Daily Log
                    </Button>)
                }
                {(siteProgress === 'in-progress') &&
                    (<Button style={styles.button} mode="contained" onPress={() => {
                        navigation.navigate('CreateFinalReportView', { siteId: site?.id });
                    }}>
                        Create Final Report
                    </Button>)
                }
                <FlatList
                    style={{ padding: 10 }}
                    data={site?.DailyLogs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <NotesCard note={item} showModal={showModal} />
                    }
                />
            </View>
        </PaperProvider>
    )
}

export { SiteDetailsView }