import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    surface: {
        padding: 8,
        height: 300,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    bodyText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 24,
    },
    startButton: {
        marginTop: 8,
    }
});

const LandingPage = ({ setStarted }) => {
    return (
        <View style={styles.container}>
            <Surface style={styles.surface}>
                <Text style={styles.titleText}>Welcome to the Document Generator App</Text>
                <Text style={styles.bodyText}>This app will guide you through taking specific photos to generate a document</Text>
                <Button mode="contained" style={styles.startButton} onPress={() => setStarted(true)}>Start</Button>
            </Surface>
        </View>
    );
};

export default LandingPage;