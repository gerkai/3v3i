import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import prompts from '../../prompts';

const PromptView = ({ currentId }) => {
    const currentPrompt = prompts.find(prompt => prompt.id === currentId);

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>{currentPrompt.prompt}</Text>
            <Image source={currentPrompt.example} style={styles.example} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    prompt: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    example: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'
    }
});

export default PromptView;
