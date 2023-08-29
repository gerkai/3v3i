import { AsyncStorage } from 'react-native';
const DocumentService = {
  saveDocument: async (siteId, propertyName, documentUri) => {
    const index = await DocumentService.getNextIndex(siteId, propertyName);
    const key = `${siteId}:${propertyName}:${index}`;
    await AsyncStorage.setItem(key, documentUri);
  },
  getDocuments: async (siteId, propertyName) => {
    const allKeys = await AsyncStorage.getAllKeys();
    const matchingKeys = allKeys.filter((key) =>
      key.startsWith(`${siteId}:${propertyName}:`)
    );
    const documents = await AsyncStorage.multiGet(matchingKeys);
    return documents.map(([, documentUri]) => documentUri);
  },
  getNextIndex: async (siteId, propertyName) => {
    const documents = await DocumentService.getDocuments(siteId, propertyName);
    return documents.length + 1;
  },
}

export default DocumentService