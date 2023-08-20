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
import { InputStationTypes } from '../components/domain-inputs/InputStationTypes'

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
                navigation.navigate('HomeView');
            });
        }
    }, [site, powerAvailabilityComments, navigation]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <SectionHeader title="Power Specific Information" />
                <InputPicker label="Power Availability" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Utility (New Service)", value: "1" },
                            { label: "House Power", value: "2" },
                            { label: "Other (Add Comments)", value: "3" },
                        ]
                    } />
                <InputText label="Power Availability" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputPicker label="Existing Utility Transformer Type" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Pole Mount", value: "1" },
                            { label: "Pad Mount", value: "2" },
                            { label: "Vault", value: "3" },
                        ]
                    } />
                <InputText label="Existing Utility Transformer Size" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputPicker label="Existing Utility Transformer Voltage" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "120/208V", value: "1" },
                            { label: "277/208V", value: "2" },
                        ]
                    } />            
                <InputPhoto label="Existing Utility Transformer" questionPhotoData={questionPhotoData}
                    siteId={route.params.siteId} photoId='001' />
                <InputText label="Existing Utility Structure Number" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputPicker label="Utility Rule" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "R29", value: "1" },
                            { label: "R16", value: "2" },
                            { label: "R15", value: "3" },
                        ]
                    } />  
                <InputPicker label="House Power tie in type" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Panel", value: "1" },
                            { label: "Switchgear Main Breaker", value: "2" },
                            { label: "Open Meter Socket", value: "3" },
                        ]
                    } />  
                <InputPicker label="House Power Voltage" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "120/208V", value: "1" },
                            { label: "277/480V", value: "2" }
                        ]
                    } />  
                <InputPhoto label="House Power Tie In" questionPhotoData={questionPhotoData}
                    siteId={route.params.siteId} photoId='002' />
                <InputText label="How much power can we pull from these tie in locations, and how would that impact construction costs?" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                
                <SectionHeader title="Site Specific Information" />
                <InputPicker label="Parking Lot Type" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Open Air", value: "1" },
                            { label: "Garage", value: "2" },
                            { label: "Both", value: "3" },
                        ]
                    } />  
                <InputText label="Parking Lot Stall Count" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Parking Lot Lighting" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={false} />
                <InputPicker label="Accessibility Required" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Yes, Public Lot", value: "1" },
                            { label: "No, Private Lot", value: "2" },
                            { label: "Both", value: "3" },
                        ]
                    } /> 
                <InputText label="Accessibility Concerns" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={false} />
                <InputPhoto label="Proposed Stall Locations" questionPhotoData={questionPhotoData}
                    siteId={route.params.siteId} photoId='003' />
                <InputPhoto label="Cellular Reception (Upload/Download Speed)" questionPhotoData={questionPhotoData}
                    siteId={route.params.siteId} photoId='004' />
                <InputText label="Carrier Type" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={false} />

                <SectionHeader title="Proposed Station Information" />
                <InputStationTypes />

                <SectionHeader title="Funding Information" />
                <InputPicker label="Is Funding currently Available?" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Yes", value: "1" },
                            { label: "No", value: "2" },
                        ]
                    } />
                <InputText label="If yes, what type?" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputPicker label="Is Future Funding Available?" getter={powerAvailability}
                    setter={setPowerAvailability} options={
                        [
                            { label: "Yes", value: "1" },
                            { label: "No", value: "2" },
                        ]
                    } />
                <InputText label="If yes, when?" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Funding Requirements (i.e. charger types quantities)" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />

                <SectionHeader title="Additional Information" />
                <InputDocumentPicker label="Proposed Site Plan" getter={documents} setter={setDocuments} />
                <InputDocumentPicker label="Additional Photo Upload" getter={documents} setter={setDocuments} />

                <SectionHeader title="Cost Analysis" />
                <InputText label="Est. Station Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Est. Station Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Est. Switchgear Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Est. Utility Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Est. Engineering Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Est. Survey Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Est. Construction Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Total Estimated Cost" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />
                <InputText label="Additional Notes" getter={powerAvailabilityComments}
                    setter={setPowerAvailabilityComments} multiline={true} />

                <Button style={styles.addButton} labelStyle={styles.addButtonText}
                    mode="contained" onPress={handleCreatePress}>
                    Create
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export { CreateSiteFeasibilityReportView }