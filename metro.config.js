const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');
defaultConfig.resolver.blockList = [/amplify\/#current-cloud-backend\/.*/];

module.exports = defaultConfig;