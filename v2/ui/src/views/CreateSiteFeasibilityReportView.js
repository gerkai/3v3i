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
import PhotoUrlService from '../services/PhotoUrlService';
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
    const [existingUtilityTransformerType, setExistingUtilityTransformerType] = React.useState(null);
    const [existingUtilityTransformerSize, setExistingUtilityTransformerSize] = React.useState(null);
    const [transformerVoltage, setTransformerVoltage] = useState(null);
    const [utilityRule, setUtilityRule] = useState(null);
    const [tieInType, setTieInType] = useState(null);
    const [housePowerVoltage, setHousePowerVoltage] = useState(null);
    const [utilityStructureNumber, setUtilityStructureNumber] = useState(null);
    const [powerImpactComments, setPowerImpactComments] = useState(null);
    const [transformerPhoto, setTransformerPhoto] = useState(null);
    const [tieInPhoto, setTieInPhoto] = useState(null);
    const [parkingLotType, setParkingLotType] = useState(null);
    const [accessibilityRequired, setAccessibilityRequired] = useState(null);
    const [stallCount, setStallCount] = useState(null);
    const [parkingLotLighting, setParkingLotLighting] = useState(null);
    const [accessibilityConcerns, setAccessibilityConcerns] = useState(null);
    const [carrierType, setCarrierType] = useState(null);
    const [stallLocationsPhoto, setStallLocationsPhoto] = useState(null);
    const [cellularReceptionPhoto, setCellularReceptionPhoto] = useState(null);
    const [currentFunding, setCurrentFunding] = useState(null);
    const [fundingType, setFundingType] = useState(null);
    const [futureFunding, setFutureFunding] = useState(null);
    const [futureFundingDate, setFutureFundingDate] = useState(null);
    const [fundingRequirements, setFundingRequirements] = useState(null);
    const [proposedSitePlan, setProposedSitePlan] = useState([]);
    const [additionalPhotos, setAdditionalPhotos] = useState([]);
    const [stationCost, setStationCost] = useState(null);
    const [switchgearCost, setSwitchgearCost] = useState(null);
    const [utilityCost, setUtilityCost] = useState(null);
    const [engineeringCost, setEngineeringCost] = useState(null);
    const [surveyCost, setSurveyCost] = useState(null);
    const [constructionCost, setConstructionCost] = useState(null);
    const [totalEstimatedCost, setTotalEstimatedCost] = useState(null);
    const [additionalNotes, setAdditionalNotes] = useState(null);

    const [documents, setDocuments] = useState([]);
    const navigation = useNavigation();

    React.useEffect(() => {
        const { siteId } = route.params;

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
                    powerAvailability: powerAvailability,
                    powerAvailabilityComments: powerAvailabilityComments,
                    existingUtilityTransformerType: existingUtilityTransformerType,
                    existingUtilityTransformerSize: existingUtilityTransformerSize,
                    transformerVoltage: transformerVoltage,
                    utilityRule: utilityRule,
                    tieInType: tieInType,
                    housePowerVoltage: housePowerVoltage,
                    utilityStructureNumber: utilityStructureNumber,
                    powerImpactComments: powerImpactComments,
                    transformerPhoto: transformerPhoto,
                    tieInPhoto: tieInPhoto,
                    parkingLotType: parkingLotType,
                    stallCount: stallCount,
                    parkingLotLighting: parkingLotLighting,
                    accessibilityRequired: accessibilityRequired,
                    accessibilityConcerns: accessibilityConcerns,
                    carrierType: carrierType,
                    stallLocationsPhoto: stallLocationsPhoto,
                    cellularReceptionPhoto: cellularReceptionPhoto,
                    currentFunding: currentFunding,
                    fundingType: fundingType,
                    futureFunding: futureFunding,
                    futureFundingDate: futureFundingDate,
                    fundingRequirements: fundingRequirements,
                    proposedSitePlan: proposedSitePlan,
                    additionalPhotos: additionalPhotos,
                    stationCost: stationCost,
                    switchgearCost: switchgearCost,
                    utilityCost: utilityCost,
                    engineeringCost: engineeringCost,
                    surveyCost: surveyCost,
                    constructionCost: constructionCost,
                    totalEstimatedCost: totalEstimatedCost,
                    additionalNotes: additionalNotes,
                    transformerPhoto: null,
                    tieInPhoto: null,
                    stallLocationsPhoto: null,
                    cellularReceptionPhoto: null
                }
            };
            StorageService.storeData(updatedSite.id, updatedSite).finally(() => {
                navigation.navigate('HomeView');
            });
        }
    }, [
        site, powerAvailability, powerAvailabilityComments, existingUtilityTransformerType,
        existingUtilityTransformerSize, transformerVoltage, utilityRule, tieInType, housePowerVoltage,
        utilityStructureNumber, powerImpactComments, transformerPhoto, tieInPhoto, parkingLotType,
        stallCount, parkingLotLighting, accessibilityRequired, accessibilityConcerns, carrierType,
        stallLocationsPhoto, cellularReceptionPhoto, currentFunding, fundingType, futureFunding,
        futureFundingDate, fundingRequirements, proposedSitePlan, additionalPhotos, stationCost,
        switchgearCost, utilityCost, engineeringCost, surveyCost, constructionCost, totalEstimatedCost,
        additionalNotes, navigation
    ]);


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
                <InputPicker label="Existing Utility Transformer Type" getter={existingUtilityTransformerType}
                    setter={setExistingUtilityTransformerType} options={
                        [
                            { label: "Pole Mount", value: "1" },
                            { label: "Pad Mount", value: "2" },
                            { label: "Vault", value: "3" },
                        ]
                    } />
                <InputText label="Existing Utility Transformer Size" getter={existingUtilityTransformerSize}
                    setter={setExistingUtilityTransformerSize} multiline={true} />
                <InputPicker label="Existing Utility Transformer Voltage" getter={transformerVoltage}
                    setter={setTransformerVoltage} options={[
                        { label: "120/208V", value: "1" },
                        { label: "277/208V", value: "2" },
                    ]} />
                <InputPhoto label="Existing Utility Transformer" questionPhotoData={transformerPhoto}
                    siteId={route.params.siteId} photoId='001' />
                <InputText label="Existing Utility Structure Number" getter={utilityStructureNumber}
                    setter={setUtilityStructureNumber} multiline={true} />
                <InputPicker label="Utility Rule" getter={utilityRule}
                    setter={setUtilityRule} options={[
                        { label: "R29", value: "1" },
                        { label: "R16", value: "2" },
                        { label: "R15", value: "3" },
                    ]} />
                <InputPicker label="House Power tie in type" getter={tieInType}
                    setter={setTieInType} options={[
                        { label: "Panel", value: "1" },
                        { label: "Switchgear Main Breaker", value: "2" },
                        { label: "Open Meter Socket", value: "3" },
                    ]} />
                <InputPicker label="House Power Voltage" getter={housePowerVoltage}
                    setter={setHousePowerVoltage} options={[
                        { label: "120/208V", value: "1" },
                        { label: "277/480V", value: "2" },
                    ]} />
                <InputPhoto label="House Power Tie In" questionPhotoData={tieInPhoto}
                    siteId={route.params.siteId} photoId='002' />
                <InputText label="How much power can we pull from these tie in locations, and how would that impact construction costs?"
                    getter={powerImpactComments} setter={setPowerImpactComments} multiline={true} />
                <SectionHeader title="Site Specific Information" />
                <InputPicker label="Parking Lot Type" getter={parkingLotType}
                    setter={setParkingLotType} options={[
                        { label: "Open Air", value: "1" },
                        { label: "Garage", value: "2" },
                        { label: "Both", value: "3" },
                    ]} />
                <InputText label="Parking Lot Stall Count" getter={stallCount}
                    setter={setStallCount} multiline={true} />
                <InputText label="Parking Lot Lighting" getter={parkingLotLighting}
                    setter={setParkingLotLighting} multiline={false} />
                <InputPicker label="Accessibility Required" getter={accessibilityRequired}
                    setter={setAccessibilityRequired} options={[
                        { label: "Yes, Public Lot", value: "1" },
                        { label: "No, Private Lot", value: "2" },
                        { label: "Both", value: "3" },
                    ]} />
                <InputText label="Accessibility Concerns" getter={accessibilityConcerns}
                    setter={setAccessibilityConcerns} multiline={false} />
                <InputPhoto label="Proposed Stall Locations" questionPhotoData={stallLocationsPhoto}
                    siteId={route.params.siteId} photoId='003' />
                <InputPhoto label="Cellular Reception (Upload/Download Speed)" questionPhotoData={cellularReceptionPhoto}
                    siteId={route.params.siteId} photoId='004' />
                <InputText label="Carrier Type" getter={carrierType}
                    setter={setCarrierType} multiline={false} />


                <SectionHeader title="Proposed Station Information" />
                <InputStationTypes />

                <SectionHeader title="Funding Information" />
                <InputPicker label="Is Funding currently Available?" getter={currentFunding}
                    setter={setCurrentFunding} options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "2" },
                    ]} />
                <InputText label="If yes, what type?" getter={fundingType}
                    setter={setFundingType} multiline={true} />
                <InputPicker label="Is Future Funding Available?" getter={futureFunding}
                    setter={setFutureFunding} options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "2" },
                    ]} />
                <InputText label="If yes, when?" getter={futureFundingDate}
                    setter={setFutureFundingDate} multiline={true} />
                <InputText label="Funding Requirements (i.e. charger types quantities)" getter={fundingRequirements}
                    setter={setFundingRequirements} multiline={true} />

                <SectionHeader title="Additional Information" />
                <InputDocumentPicker label="Proposed Site Plan" getter={proposedSitePlan} setter={setProposedSitePlan} siteId={route.params.siteId} />
                <InputDocumentPicker label="Additional Photo Upload" getter={additionalPhotos} setter={setAdditionalPhotos} siteId={route.params.siteId} />

                <SectionHeader title="Cost Analysis" />
                <InputText label="Est. Station Cost" getter={stationCost}
                    setter={setStationCost} multiline={true} />
                <InputText label="Est. Switchgear Cost" getter={switchgearCost}
                    setter={setSwitchgearCost} multiline={true} />
                <InputText label="Est. Utility Cost" getter={utilityCost}
                    setter={setUtilityCost} multiline={true} />
                <InputText label="Est. Engineering Cost" getter={engineeringCost}
                    setter={setEngineeringCost} multiline={true} />
                <InputText label="Est. Survey Cost" getter={surveyCost}
                    setter={setSurveyCost} multiline={true} />
                <InputText label="Est. Construction Cost" getter={constructionCost}
                    setter={setConstructionCost} multiline={true} />
                <InputText label="Total Estimated Cost" getter={totalEstimatedCost}
                    setter={setTotalEstimatedCost} multiline={true} />
                <InputText label="Additional Notes" getter={additionalNotes}
                    setter={setAdditionalNotes} multiline={true} />

                <Button style={styles.addButton} labelStyle={styles.addButtonText}
                    mode="contained" onPress={handleCreatePress}>
                    Create
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export { CreateSiteFeasibilityReportView }