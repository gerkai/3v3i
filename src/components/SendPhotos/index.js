import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import { API, Storage } from 'aws-amplify';

const SendPhotos = ({ photos, email }) => {
    const [isSending, setIsSending] = useState(false);
    const [response, setResponse] = useState(null);

    const handleSend = async () => {
        setIsSending(true);

        const apiName = 'charger'; // replace this with your api name.
        const path = '/documentdata'; //replace this with the path you have configured on your API
        const myInit = {
            body: {
                photos
            }
        };

        console.log(JSON.stringify(myInit))

        API.post(apiName, path, myInit)
            .then((response) => {
                console.log(response)
                setResponse(response.data)
            })
            .catch((error) => {
                console.log(JSON.stringify(error.response.data.message))
                setResponse("nope");
            });

        setIsSending(false);
    };

    const handleSend2 = async () => {
        setIsSending(true);

        photos.forEach(async photo => {

            const photoTest = await fetch(photo.uri)
            const photoBlob = await photoTest.blob();

            console.log(photoBlob)
            try {
                await Storage.put("test.jpg", photoBlob, {
                    level: "private",
                    contentType: "image/jpg", // contentType is optional
                });
            } catch (error) {
                console.log("Error uploading file: ", error);
            }
        });

        setIsSending(false);
    }


    return (
        <View>
            <Text>Please review the photos:</Text>
            {photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo.uri }} style={{ width: 200, height: 200 }} />
            ))}
            {response && <Text>{response}</Text>}
            <Button title="Send" onPress={handleSend2} disabled={isSending} />
        </View>
    );
};

export default SendPhotos;
