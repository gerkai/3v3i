import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {

  async storeData(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      return true;
    } catch (error) {
      console.error('Error storing data:', error);
      return false;
    }
  },

  async retrieveData(key) {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  },

  async clearAllData() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },

  async getAllData() {
    try {
      const excludeKeyPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}:[0-9]{3}$/;
      const allKeys = (await AsyncStorage.getAllKeys())
        .filter((key) => key !== 'jwtToken' && key !== 'EXPO_CONSTANTS_INSTALLATION_ID' && !excludeKeyPattern.test(key) && !key.includes('document'));
      const allData = await AsyncStorage.multiGet(allKeys);
      return allData;
    } catch (error) {
      console.error('Error retrieving all data:', error);
      return [];
    }
  },
};

export default StorageService;
