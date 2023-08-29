import AsyncStorage from '@react-native-async-storage/async-storage';

const PhotoUrlService = {
  async storePhotoUrl(siteId, questionId, photoUrl) {
    try {
      const key = `${siteId}:${questionId}`;
      await AsyncStorage.setItem(key, photoUrl);
    } catch (error) {
      console.error('Error storing photo URL:', error);
    }
  },

  async getPhotoUrl(siteId, questionId) {
    try {
      const key = `${siteId}:${questionId}`;
      const photoUrl = await AsyncStorage.getItem(key);
      return photoUrl;
    } catch (error) {
      console.error('Error getting photo URL:', error);
      return null;
    }
  },
};

export default PhotoUrlService;
