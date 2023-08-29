import React, {useCallback} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, PaperProvider, Portal, Modal } from 'react-native-paper';

const styles = StyleSheet.create({
    noteCard: {
        paddingTop: 10
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const NotesCard = ({ note, showModal }) => {

    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[date.getDay()];

        const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const ampm = date.getHours() >= 12 ? 'pm' : 'am';

        const month = date.getMonth() + 1; // months are 0-indexed in JS
        const day = date.getDate();
        const year = date.getFullYear().toString().slice(2); // get the last 2 digits of the year

        return `${dayOfWeek} ${hour}:${minute}${ampm} ${month}/${day}/${year}`;
    };
    const formatNotes = (notes) => {
        if (notes.length > 280) {
            return notes.slice(0, 280) + '...';
        }
        return notes;
    };

    const handleShowModal = useCallback(() => {
        showModal(note);

    }, [note]);

    return (
        <View style={styles.noteCard}>
            <Text style={styles.date}>{formatDate(note.created)}</Text>
            <Text>{formatNotes(note.notes)}</Text>
            <Button style={{ marginTop: 30 }} mode="contained" onPress={handleShowModal}>
                Show
            </Button>
        </View>
    )
}

export { NotesCard }
