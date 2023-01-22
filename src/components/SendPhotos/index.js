import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';

const SendPhotos = ({ photos, email }) => {
    const [sendStatus, setSendStatus] = useState(null);

    console.log(photos)
    console.log(email)

    const handleSend = async () => {
        try {
            // send photos and email to backend
            const response = await axios.post('https://your-backend-url.com/send', {
                photos,
                email
            });

            setSendStatus('success');
        } catch (error) {
            console.log(error);
            setSendStatus('error');
        }
    };


    return (
        <View>
            {sendStatus === 'success' ? (
                <Text>Photos sent!</Text>
            ) : (
                <>
                    <Text>Please review the photos:</Text>
                    {photos.map((photo, index) => (
                        <Image key={index} source={{ uri: photo.uri }} style={{ width: 200, height: 200 }} />
                    ))}
                    <Button title="Send" onPress={handleSend} />
                </>
            )}
        </View>
    );
};

export default SendPhotos;
