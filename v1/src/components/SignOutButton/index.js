import { useAuthenticator } from '@aws-amplify/ui-react-native';
import React from 'react';
import { Button } from 'react-native';

const SignOutButton = () => {
    const { signOut } = useAuthenticator();
    return <Button title="Sign Out" onPress={signOut} />;
}

export default SignOutButton;
