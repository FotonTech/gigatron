const path = require('path')

module.exports = {
  watchFolders: [path.resolve(__dirname, '../../')],
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx']
  },
}
