import Constants from 'expo-constants';
let API_BASE_URL = 'https://1c9a-70-112-238-254.ngrok-free.app';

// If the app is in production or a specific release channel, switch the URL
if (!__DEV__ || (Constants.expoConfig.releaseChannel && Constants.expoConfig.releaseChannel === 'production')) {
  API_BASE_URL = 'https://1c9a-70-112-238-254.ngrok-free.app';
}

const AuthenticationService = {
  registerUser(name, email, password) {
    return fetch(`${API_BASE_URL}/api/User/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((response) => {
      if (response.ok) {
        return response;
      } 
      throw new Error('Invalid email or password.');
    }).then((data) => {
      return data;
    }).catch((error) => {
      console.error('Error logging in:', error);
      throw error;
    })
  },
  activateUser(activationToken) {
    return fetch(`${API_BASE_URL}/api/User/Activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activationToken }),
    }).then((response) => {
      if (response.ok) {
        return response;
      } 
      throw new Error('Invalid activation code.');
    }).then((data) => {
      return data;
    }).catch((error) => {
      console.error('Error activating code:', error);
      throw error;
    })
  },
  loginUser(email, password) {
    return fetch(`${API_BASE_URL}/api/User/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Invalid email or password.');
    }).then((data) => {
      return data;
    }).catch((error) => {
      console.error('Error logging in:', error);
      throw error;
    })
  },
  requestPasswordReset(email) {
    return fetch(`${API_BASE_URL}/api/User/ResetPasswordRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((response) => {
      if (response.ok) {
        return response;
      } 
      throw new Error('Invalid activation code.');
    }).then((data) => {
      return data;
    }).catch((error) => {
      console.error('Error activating code:', error);
      throw error;
    })
  },
  resetPassword(password, resetPasswordToken) {
    return fetch(`${API_BASE_URL}/api/User/ResetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, resetPasswordToken }),
    });
  },
};

export default AuthenticationService;