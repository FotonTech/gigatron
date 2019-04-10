const rootbabel = require('../../babel.config')

module.exports = {
  ...rootbabel(),
  presets: ['module:metro-react-native-babel-preset'],
}
