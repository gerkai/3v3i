import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  header: {
    backgroundColor: '#f5f5f5'
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#000'
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 5
  }
});

const StationTypesTable = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <View style={styles.cell}><Text>&nbsp;</Text></View>
        <View style={styles.cell}><Text>Quantity</Text></View>
        <View style={styles.cell}><Text>Size</Text></View>
      </View>

      {['DCFC', 'L2'].map((type, rowIndex) => (
        Array(3).fill().map((_, colIndex) => (
          <View key={`${rowIndex}-${colIndex}`} style={styles.row}>
            <View style={styles.cell}><Text>{type}</Text></View>
            <View style={styles.cell}>
              <TextInput
                style={styles.input}
                placeholder="Enter quantity"
              />
            </View>
            <View style={styles.cell}>
              <Picker style={styles.input}>
                <Picker.Item label="Select size" value="" />
                {['50kW', '75kW', '100kW', '150kW', '175kW', '350kW', '32A', '40A', '50A', '80A'].map(size => (
                  <Picker.Item key={size} label={size} value={size} />
                ))}
              </Picker>
            </View>
          </View>
        ))
      ))}
    </View>
  );
};

export { StationTypesTable };
