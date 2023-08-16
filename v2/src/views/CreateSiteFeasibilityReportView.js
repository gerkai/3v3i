import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Platform, KeyboardAvoidingView } from 'react-native';
import StorageService from '../services/StorageService';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { Picker } from '@react-native-picker/picker';
import { SectionHeader } from '../components/inputs/SectionHeader'
import { InputPicker } from '../components/inputs/InputPicker'
import { InputText } from '../components/inputs/InputText'
import { InputPhoto } from '../components/inputs/InputPhoto';
import { InputDocumentPicker } from '../components/inputs/InputDocumentPicker';
import { StationTypesTable } from '../components/inputs/StationTypesTable';
import { InputStationTypes} from '../components/domain-inputs/InputStationTypes'

const styles = StyleSheet.create({
    addButton: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    addButtonText: {
        fontSize: 18,
    },
    sectionHeader: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    inputGroup: {
        marginTop: 10,
        marginBottom: 10,
    }
});

const CreateSiteFeasibilityReportView = ({ route }) => {

    const [site, setSite] = React.useState(null);
    const [powerAvailability, setPowerAvailability] = React.useState(null);
    const [powerAvailabilityComments, setPowerAvailabilityComments] = React.useState(null);
    const [questionPhotoData, setQuestionPhotoData] = React.useState(null);
    const [documents, setDocuments] = useState([]);
    const navigation = useNavigation();

    React.useEffect(() => {
        const { siteId, photoData } = route.params;
        setQuestionPhotoData(photoData);
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)
        });
    }, [route.params]);

    const handleCreatePress = useCallback(() => {
        if (site) {
            const updatedSite = {
                ...site,
                SiteFeasibilityReport: {
                    ...site.SiteFeasibilityReport,
                    powerAvailabilityComments: powerAvailabilityComments
                }
            };
            StorageService.storeData(updatedSite.id, updatedSite).finally(() => {
                navigation.navigate('SiteDetailsView', { siteId: updatedSite.id });
            });
        }
    }, [site, powerAvailabilityComments, navigation]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <SectionHeader title="Site Feasibility Report" />
                <InputPicker label="Power Availability" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Utility (New Service)", value: "1" },
                            { label: "House Power", value: "2" },
                            { label: "Other (Add Comments)", value: "3" },
                        ]
                    } />
                <InputText label="Power Availability" getter={powerAvailabilityComments} setter={setPowerAvailabilityComments} multiline={true} />
                <InputPhoto label="Existing Utility Transformer" questionPhotoData={questionPhotoData}
                    siteId={route.params.siteId} photoId='001' />
                <InputDocumentPicker label="Proposed Site Plan" getter={documents} setter={setDocuments} />
                <InputStationTypes />
                <Button style={styles.addButton} labelStyle={styles.addButtonText}
                    mode="contained" onPress={handleCreatePress}>
                    Create
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export { CreateSiteFeasibilityReportView }