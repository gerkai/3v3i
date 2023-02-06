import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { SafeAreaView } from 'react-native';
import { Amplify } from 'aws-amplify';
import SafeViewAndroid from './src/utils/SafeViewAndroid';

import awsExports from './src/aws-exports';
import { Provider as PaperProvider } from 'react-native-paper';
import LandingPage from './src/screens/LandingPage';
import Title from './src/screens/Title';
import RevisionHistory from './src/screens/RevisionHistory';
import SiteDetails from './src/screens/SiteDetails';
import AdditionalTasks from './src/screens/AdditionalTasks';
import AdditionalDocuments from './src/screens/AdditionalDocuments';
import HighPoweredMultiSystemData from './src/screens/HighPoweredMultiSystemData';
import StandaloneChargingSystemData from './src/screens/StandaoneChargingSystemDataPrompts';
import SitePhotos from './src/screens/SitePhotos';
import EquipmentPad from './src/screens/EquipmentPad';
import TypeDDispensers from './src/screens/TypeDDispensers';
import Type1DDispensers from './src/screens/Type1DDispensers';
import PowerCabinets from './src/screens/PowerCabinets';
import Switchgear from './src/screens/Switchgear';
import TransformerMeter from './src/screens/TransformerMeter';
import KeyLocation from './src/screens/KeyLocation';
import CreateHTMLDocument from './src/components/CreateHTMLDocument';
import ConstantPhotoPrompts from './src/components/ConstantPhotoPrompts';
import GetPowerCabinets from './src/components/GetPowerCabinets';
import GetDispensers from './src/components/GetDispensers';
import FormPrompts from './src/components/FormPrompts';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyProviders from './src/context/MyProviders';

const theme = {};

Amplify.configure(awsExports);

const Stack = createStackNavigator();

export default function App() {

  const [photos, setPhotos] = useState([])
  const [allFormInputs, setAllFormInputs] = useState(null);
  const [allConstantComplete, setAllConstantComplete] = useState(false);
  const [allPowerCabinetsComplete, setAllPowerCabinetsComplete] = useState(false);
  const [allDispenserDComplete, setAllDispenserDComplete] = useState(false);
  const [allDispenser1DComplete, setAllDispenser1DComplete] = useState(false);

  const addPhoto = (newPhoto) => {
    setPhotos([...photos, newPhoto])
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Authenticator.Provider>
          <Authenticator>
            <MyProviders>
              <Stack.Navigator>
                <Stack.Screen name="LandingPage" component={LandingPage} options={{ title: 'Welcome' }} />
                <Stack.Screen name="Title" component={Title} />
                <Stack.Screen name="RevisionHistory" component={RevisionHistory} options={{ title: 'Revision History' }} />
                <Stack.Screen name="SiteDetails" component={SiteDetails} options={{ title: 'Site Details' }} />
                <Stack.Screen name="AdditionalTasks" component={AdditionalTasks} options={{ title: 'Additional Tasks' }} />
                <Stack.Screen name="AdditionalDocuments" component={AdditionalDocuments} options={{ title: 'Additional Documents' }} />
                <Stack.Screen name="HighPoweredMultiSystemData" component={HighPoweredMultiSystemData} options={{ title: 'High Powered Multi-System Data' }} />
                <Stack.Screen name="StandaloneChargingSystemData" component={StandaloneChargingSystemData} options={{ title: 'Standalone Charging System Data' }} />
                <Stack.Screen name="SitePhotos" component={SitePhotos} options={{ title: 'Site Photos' }} />
                <Stack.Screen name="EquipmentPad" component={EquipmentPad} options={{ title: 'Equipment Pad' }} />
                <Stack.Screen name="TypeDDispensers" component={TypeDDispensers} options={{ title: 'Type D Dispensers' }} />
                <Stack.Screen name="Type1DDispensers" component={Type1DDispensers} options={{ title: 'Type 1D Dispensers' }} />
                <Stack.Screen name="PowerCabinets" component={PowerCabinets} options={{ title: 'Power Cabinets' }} />
                <Stack.Screen name="Switchgear" component={Switchgear} />
                <Stack.Screen name="TransformerMeter" component={TransformerMeter} options={{ title: 'Transformer + Meter' }} />
                <Stack.Screen name="KeyLocation" component={KeyLocation} options={{ title: 'Key Location' }} />
                <Stack.Screen name="CreateHTMLDocument" component={CreateHTMLDocument} options={{ title: 'Create HTML Document' }} />
              </Stack.Navigator>
            </MyProviders>
          </Authenticator>
        </Authenticator.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
