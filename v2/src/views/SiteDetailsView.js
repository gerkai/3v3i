import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorageService from '../services/StorageService';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

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
    const [showSiteFeasibilityReport, setShowSiteFeasibilityReport] = React.useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        const { siteId } = route.params;
        StorageService.retrieveData(siteId).then(data => {
            setSite(data)

            if(data?.SiteFeasibilityReport !== undefined){
                setShowSiteFeasibilityReport(false);
            } else {
                setShowSiteFeasibilityReport(true);
            } 
        });
    }, [route.params])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{site?.name}</Text>
            <Text style={styles.text}>{site?.address}</Text>
            <Text style={styles.text}>{site?.attendeeFirstName} {site?.attendeeLastName}</Text>
            <Text style={styles.text}>{site?.date}</Text>
            <Text style={styles.text}>Status: {site?.SiteFeasibilityReport === undefined ? 'Not Started' : 'In Progress'}</Text>
            {showSiteFeasibilityReport &&
                (<Button mode="contained" onPress={() => {
                    navigation.navigate('CreateSiteFeasibilityReportView', { siteId: site?.id });
                }}>
                    Create Site Feasibility Report
                </Button>)
            }
             { !showSiteFeasibilityReport &&
                (<Button mode="contained" onPress={() => {
                    navigation.navigate('CreateDailyLogView', { siteId: site?.id });
                }}>
                    Create Daily Log
                </Button>)
            }
            { !showSiteFeasibilityReport &&
                (<Button mode="contained" onPress={() => {
                    navigation.navigate('CreateFinalReportView', { siteId: site?.id });
                }}>
                    Create Final Report
                </Button>)
            }
        </View>
    )
}

export { SiteDetailsView }