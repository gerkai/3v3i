import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    sectionHeader: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    }
});

const SectionHeader = ({ title }) => {

    return (
    <Text style={styles.sectionHeader}>
        {title || ''}
    </Text>
    );
}

export { SectionHeader }