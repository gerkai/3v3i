import {View, Text} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

const CreateDailyLogView = () => {

    const navigation = useNavigation();

    return(
        <View>
            <Text>Create Daily Log</Text>
            <Button mode="contained" onPress={() => {
                    navigation.navigate('HomeView');
                }}>
                    Save
                </Button>
        </View>
    )
}

export {CreateDailyLogView};