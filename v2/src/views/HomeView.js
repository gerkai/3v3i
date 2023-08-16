import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import StorageService from '../services/StorageService';
import { IconButton, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%'
    },
    listItem: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    listItemText: {
        paddingLeft: 20
    },
    flatlist: {
        flex: 1,
        flexDirection: 'column'
    },
    notStartedText: {
        color: '#000000',
        paddingLeft: 20
    },
    inProgressText: {
        color: 'green',
        paddingLeft: 20
    },
    completedText: {
        color: 'lightgray',
        paddingLeft: 20
    }
});

const HomeView = () => {

    const [sites, setSites] = React.useState([]);
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{JSON.parse(item[1]).name}</Text>
            <IconButton
                icon="chevron-right"
                color="#FF0000"
                size={20}
                onPress={() => {
                    navigation.navigate('SiteDetailsView', { siteId: JSON.parse(item[1]).id });
                }}
            />
        </View>
    );

    React.useEffect(() => {
        StorageService.getAllData().then(data => {
            setSites(data);
        });
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            StorageService.getAllData().then(data => {
                setSites(data);
            });

            return () => {
                
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sites}
                renderItem={renderItem}
                keyExtractor={(item, index) => item[0]}
                style={styles.flatlist}
            >
            </FlatList>
        </View>
    )
}

export { HomeView };
