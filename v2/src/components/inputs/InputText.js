import { TextInput } from 'react-native-paper';

const InputText = ({ label, getter, setter, multiline = false }) => {

    return (
        <TextInput
            label={label}
            multiline={multiline}
            value={getter}
            onChangeText={text => {
                setter(text);
            }}
        />
    )
}

export { InputText }