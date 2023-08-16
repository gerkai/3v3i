import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { HomeView } from './src/views/HomeView';
import { AddSiteView } from './src/views/AddSiteView';
import { SiteDetailsView } from './src/views/SiteDetailsView';
import { CreateSiteFeasibilityReportView } from './src/views/CreateSiteFeasibilityReportView';
import { CreateDailyLogView } from './src/views/CreateDailyLogView';
import { CreateFinalReportView } from './src/views/CreateFinalReportView';
import { CameraView } from './src/views/CameraView';
const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="HomeView" component={HomeView}
            options={({ navigation }) => ({
              title: 'Sites',
              headerRight: () => (
                <Button icon="plus" mode="contained" onPress={() => navigation.navigate('AddSiteView')}>
                  Add Site
                </Button>
              ),
            })}
          />
          <Stack.Screen name="AddSiteView" component={AddSiteView} options={{
            title: 'Add Site'
          }} />
          <Stack.Screen name="SiteDetailsView" component={SiteDetailsView} options={{
            title: 'Site Details'
          }} />
          <Stack.Screen name="CreateSiteFeasibilityReportView" component={CreateSiteFeasibilityReportView} options={{
            title: 'Site Feasibility Report'
          }} />
          <Stack.Screen name="CreateDailyLogView" component={CreateDailyLogView} options={{
            title: 'Daily Log'
          }} />
          <Stack.Screen name="CreateFinalReportView" component={CreateFinalReportView} options={{
            title: 'Final Report'
          }}/>
          <Stack.Screen name="CameraView" component={CameraView} options={{
            title: 'Capture Photo'
          }}/>
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}