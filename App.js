import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { SafeAreaView } from 'react-native';
import { Amplify } from 'aws-amplify';
import SafeViewAndroid from './src/utils/SafeViewAndroid';

import awsExports from './src/aws-exports';
import { Provider as PaperProvider } from 'react-native-paper';
import LandingPage from './src/screens/LandingPage';
import CreateHTMLDocument from './src/components/CreateHTMLDocument';
import GetDispensers from './src/components/GetDispensers';
import FormPrompts from './src/components/FormPrompts';

const theme = {};

Amplify.configure(awsExports);

export default function App() {

  const [started, setStarted] = useState(false)
  const [photos, setPhotos] = useState([])
  const [allFormInputs, setAllFormInputs] = useState(null);
  const [allDispenserDComplete, setAllDispenserDComplete] = useState(false);
  const [allDispenser1DComplete, setAllDispenser1DComplete] = useState(false);

  const addPhoto = (newPhoto) => {
    setPhotos([...photos, newPhoto])
  }

  return (
    <PaperProvider theme={theme}>
      <Authenticator.Provider>
        <Authenticator>
          <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            {!started && <LandingPage setStarted={setStarted} />}
            {started && !allFormInputs && <FormPrompts setAllFormInputs={setAllFormInputs} />}
            {!!allFormInputs && !allDispenserDComplete && <GetDispensers type={'D'} addPhoto={addPhoto} setComplete={setAllDispenserDComplete} />}
            {allDispenserDComplete && !allDispenser1DComplete && <GetDispensers type={'1D'} addPhoto={addPhoto} setComplete={setAllDispenser1DComplete} />}
            {allDispenser1DComplete && <CreateHTMLDocument allFormInputs={allFormInputs} photos={photos} />}
          </SafeAreaView>
        </Authenticator>
      </Authenticator.Provider>
    </PaperProvider>
  );
}
