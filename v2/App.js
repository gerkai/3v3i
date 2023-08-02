import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Home} from './src/views/Home';

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}