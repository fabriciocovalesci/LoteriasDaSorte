// const { getDefaultConfig } = require('@expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   resolver: {
//     assetExts: [...defaultConfig.resolver.assetExts, 'db', 'json'],
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };

const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

module.exports = {
    resolver: {
        assetExts: [
            ...defaultAssetExts,
            "db", "sqlite"
        ]
    }
};