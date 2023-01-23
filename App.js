import { Authenticator } from '@aws-amplify/ui-react-native';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import PhotoPrompt from './src/components/PhotoPrompt';
import SendPhotos from './src/components/SendPhotos';
import SignOutButton from './src/components/SignOutButton';
import prompts from './src/prompts';
import SafeViewAndroid from './src/utils/SafeViewAndroid';

import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const [currentPromptId, setCurrentPromptId] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [email, setEmail] = useState('connor.mcelroy@outlook.com');

  const handleTakePhoto = (photo) => {
    setPhotos([...photos, photo]);
    setCurrentPromptId(currentPromptId + 1);
  }

  return (
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
          {/* <SignOutButton /> */}

          {currentPromptId < prompts.length ? <PhotoPrompt currentId={currentPromptId} setPicture={handleTakePhoto} /> : <SendPhotos photos={photos} email={email} />}
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
}
