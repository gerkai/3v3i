import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InputPicker = ({ label, getter, setter, options }) => {

    return (
        <View>
            <Text>
                {label || ''}
            </Text>
            <Picker
                selectedValue={getter}
                onValueChange={(itemValue, itemIndex) =>
                    setter(itemValue)
                }>
                {
                    options.map((option, index) => {
                        return <Picker.Item key={index} label={option.label} value={option.value} />
                    })
                }
            </Picker>
        </View>
    );
}

export { InputPicker }