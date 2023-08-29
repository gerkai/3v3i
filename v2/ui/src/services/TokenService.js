import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'jwtToken';

const TokenService = {
    async storeToken(token) {
        (token);
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    async retrieveToken() {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    async clearToken() {
        await AsyncStorage.removeItem(TOKEN_KEY);
    },

    _decodeBase64(base64) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let str = '';
        let i = 0;

        while (i < base64.length) {
            const enc1 = chars.indexOf(base64[i++]);
            const enc2 = chars.indexOf(base64[i++]);
            const enc3 = chars.indexOf(base64[i++]);
            const enc4 = chars.indexOf(base64[i++]);

            const chr1 = (enc1 << 2) | (enc2 >> 4);
            const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            const chr3 = ((enc3 & 3) << 6) | enc4;

            str += String.fromCharCode(chr1);

            if (enc3 !== 64) {
                str += String.fromCharCode(chr2);
            }

            if (enc4 !== 64) {
                str += String.fromCharCode(chr3);
            }
        }

        return str;
    },

    _decodeToken(token) {
        try {
            const payloadBase64Url = token.split('.')[1];
            const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payloadUtf8 = this._decodeBase64(payloadBase64);
            return JSON.parse(payloadUtf8);
        } catch (error) {
            console.error('Error decoding the JWT token:', error);
            return null;
        }
    },

    get isLoggedIn() {
        return (async () => {
            const token = await this.retrieveToken();

            if (!token) {
                return false;
            }

            const decodedToken = this._decodeToken(token);

            if (decodedToken && decodedToken.exp) {
                const currentTimestamp = Math.floor(Date.now() / 1000); // Date.now() returns in milliseconds
                return decodedToken.exp > currentTimestamp;
            }

            return false;
        })();
    },
};

export default TokenService;
