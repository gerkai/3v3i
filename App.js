import { useState } from 'react';
import { Text, View } from 'react-native';
import PhotoPrompt from './src/components/PhotoPrompt';
import prompts from './src/prompts';

export default function App() {
  const [currentPromptId, setCurrentPromptId] = useState(0);

  return (
    <View style={{flex: 1}}>
      {currentPromptId < prompts.length ? (
        <PhotoPrompt currentId={currentPromptId} setCurrentId={setCurrentPromptId} />
      ) : (
        <Text>All prompts have been taken</Text>
      )}
    </View>
  );
}