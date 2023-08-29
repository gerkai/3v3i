import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import TokenService from './TokenService';

import Constants from 'expo-constants';
let API_BASE_URL = 'https://1c9a-70-112-238-254.ngrok-free.app';

// If the app is in production or a specific release channel, switch the URL
if (!__DEV__ || (Constants.expoConfig.releaseChannel && Constants.expoConfig.releaseChannel === 'production')) {
    API_BASE_URL = 'https://1c9a-70-112-238-254.ngrok-free.app';
}

const PdfService = {
    async DownloadPdf(site) {

        await TokenService.retrieveToken().then((token) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(site), // Ensure 'site' is a valid object
            };
    
            return fetch(`${API_BASE_URL}/api/Pdf/Download`, requestOptions)
                .then(async (response) => {
                    if (response.ok) {
                        const blob = await response.blob();
                        const fileName = 'site-feasibility-report.pdf';
    
                        const reader = new FileReader();
    
                        reader.onload = async () => {
                            try {
                                const fileUri = FileSystem.documentDirectory + fileName;
    
                                // Ensure the downloads directory exists
                                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory, { intermediates: true });
    
                                await FileSystem.writeAsStringAsync(
                                    fileUri,
                                    reader.result.split(',')[1],
                                    { encoding: FileSystem.EncodingType.Base64 }
                                );
    
                                ('File saved at:', fileUri);
                                Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', dialogTitle: 'Open PDF' })
                                .catch((error) => {
                                    ('Error sharing PDF:', error);
                                });
                                // Now you can open the file or share it as needed
                            } catch (error) {
                                console.error('Error saving file:', error);
                            }
                        };
    
                        reader.readAsDataURL(blob);
    
                    } else {
                        throw new Error('Unable to download pdf');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    throw error;
                });
        }).catch((error) => {
            (error);
        });

    },
    async SendPdf(site, email) {
        await TokenService.retrieveToken().then((token) => {
            
        (site);
        site['toEmail'] = email;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(site),
        };

        return fetch(`${API_BASE_URL}/api/Pdf/Email`, requestOptions)
            .then(async (response) => {
                if (response.ok) {
                    
                    ('')
                } else {
                    throw new Error('Unable to download pdf');
                }
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
        }).catch((error) => {
            (error);
        });
    }
};

export default PdfService;
