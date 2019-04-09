/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    blacklistRE: /gigatron[/]node_modules[/]react-native[/].*/
  },
  watchFolders: [
    path.resolve(__dirname, '../../'),
  ],
};
