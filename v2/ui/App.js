import * as React from 'react';
import { Linking } from 'react-native';
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
import { LoginView } from './src/views/LoginView';
import { RegisterView } from './src/views/RegisterView';
import { EmailVerificationSentView } from './src/views/EmailVerificationSentView';
import { ShowSiteFeasibilityReportView } from './src/views/ShowSiteFeasibilityReportView';
import { ResetPasswordView } from './src/views/ResetPasswordView';
import { ResetPasswordRequestView } from './src/views/ResetPasswordRequestView';
const Stack = createStackNavigator();

export default function App() {

  const handleDeepLink = async ({ url }) => {
    if (url) {
      // Parse the URL to extract query parameters
      const queryParams = Linking.parse(url);

      // Extract the activation token from query parameters
      const activationToken = queryParams.queryParams['activationtoken'];

      // Navigate to the account activation screen, passing the activation token
      navigation.replace('AccountActivation', { activationToken });
    }
  };

  React.useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);
    // Clean up the event listener when the component unmounts
    return () => Linking.removeEventListener('url', handleDeepLink);
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="LoginView" component={LoginView} options={{ headerShown: false}}/>
          <Stack.Screen name="RegisterView" component={RegisterView} options={{ headerShown: false}}/>
          <Stack.Screen name="ResetPasswordView" component={ResetPasswordView} options={{ title: 'Reset Password'}}/>
          <Stack.Screen name="EmailVerificationSentView" component={EmailVerificationSentView} options={{ title: 'Email Verification Sent'}} />
          <Stack.Screen name="ResetPasswordRequestView" component={ResetPasswordRequestView} options={{ title: 'Reset Password Request'}} />
          <Stack.Screen name="ShowSiteFeasibilityReportView" component={ShowSiteFeasibilityReportView} options={{
            title: 'Site Feasibility Report'
          }} />
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