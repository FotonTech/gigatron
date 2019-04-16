#! /usr/bin/env node

const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const renameFile = util.promisify(fs.rename)
const statFile = util.promisify(fs.stat)

async function fileExists(path) {
  let result
  try {
    result = await statFile(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    }
    throw error
  }
  return result
}

async function areWeInRoot() {
  if (!(await fileExists('package.json'))) {
    throw new Error('\nPackage.json not found, is this a monorepo?\n')
  }
  const packageJson = await readFile('package.json', 'utf-8')
  const json = JSON.parse(packageJson)
  if (!json.workspaces) {
    // we're not in the monorepo root...
    process.chdir('../..')
    return false
  }
  return true
}

async function main() {
  const isRoot = await areWeInRoot()
  if (!isRoot) {
    await areWeInRoot()
  }
  if (await fileExists('packages/shared/node_modules/react-native2')) {
    // return console.warn('Already patched')
  }

  try {
    await renameFile(
      'packages/shared/node_modules/react-native',
      'packages/shared/node_modules/react-native2',
    )
  } catch (error) {}
  const todoRequire = [
    'packages/shared/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
  ]

  for (const path of todoRequire) {
    const fileAsString = await readFile(path, 'utf-8')
    const patchedFile = fileAsString.replace("require('react-native'", "require('react-native2'")
    await writeFile(path, patchedFile)
  }

  const todoImport = [
    'packages/shared/node_modules/react-navigation-stack/src/index.js',
    'packages/shared/node_modules/styled-components/native/dist/styled-components.native.esm.js',
    'packages/shared/node_modules/react-native-tab-view/src/TabBar.js',
    'packages/shared/node_modules/react-native-tab-view/src/PagerScroll.js',
    'packages/shared/node_modules/react-native-tab-view/src/PropTypes.js',
    'packages/shared/node_modules/react-native-tab-view/src/TypeDefinitions.js',
    'packages/shared/node_modules/react-native-tab-view/src/TabView.js',
    'packages/shared/node_modules/react-native-tab-view/src/PagerDefault.js',
    'packages/shared/node_modules/react-native-tab-view/src/PagerAndroid.js',
    'packages/shared/node_modules/react-native-tab-view/src/TouchableItem.js',
    'packages/shared/node_modules/react-native-tab-view/src/PagerExperimental.js',
    'packages/shared/node_modules/react-native-tab-view/src/PagerPan.js',
    'packages/shared/node_modules/react-native2/template/App.js',
    'packages/shared/node_modules/react-native2/template/index.js',
    'packages/shared/node_modules/react-native2/Libraries/Image/ImageBackground.js',
    'packages/shared/node_modules/react-native2/Libraries/Renderer/oss/ReactFabric-dev.js',
    'packages/shared/node_modules/react-native2/Libraries/Renderer/oss/ReactNativeRenderer-dev.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/Button.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/CheckBox/CheckBox.android.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/WebView/WebView.ios.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/Slider/Slider.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/Keyboard/Keyboard.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/Touchable/TouchableOpacity.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/Touchable/TouchableHighlight.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/MaskedView/MaskedViewIOS.ios.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/TextInput/TextInput.js',
    'packages/shared/node_modules/react-native2/Libraries/Components/TextInput/InputAccessoryView.js',
    'packages/shared/node_modules/@react-navigation/native/dist/Scrollables.js',
    'packages/shared/node_modules/@react-navigation/native/dist/ResourceSavingSceneView.js',
    'packages/shared/node_modules/@react-navigation/native/dist/withOrientation.js',
    'packages/shared/node_modules/@react-navigation/native/dist/createKeyboardAwareNavigator.js',
    'packages/shared/node_modules/@react-navigation/native/dist/createAppContainer.js',
    'packages/shared/node_modules/react-navigation-stack/dist/navigators/createStackNavigator.js',
    'packages/shared/node_modules/react-navigation-stack/dist/index.js',
    'packages/shared/node_modules/react-navigation-stack/dist/utils/ReactNativeFeatures.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/Header/ModularHeaderBackButton.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/Header/Header.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/Header/HeaderBackButton.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/Header/HeaderStyleInterpolator.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/Header/HeaderTitle.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/Transitioner.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/BorderlessButton.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/StackView/StackViewTransitionConfigs.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/StackView/StackViewLayout.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/StackView/StackViewCard.js',
    'packages/shared/node_modules/react-navigation-stack/dist/views/TouchableItem.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/BorderlessButton.js',
    'packages/shared/node_modules/react-native-screens/src/screens.web.js',
    'packages/shared/node_modules/react-native-safe-area-view/index.web.js',
    'packages/shared/node_modules/react-native-gesture-handler/createHandler.js',
    'packages/shared/node_modules/react-native-gesture-handler/touchables/TouchableOpacity.js',
    'packages/shared/node_modules/react-native-gesture-handler/touchables/GenericTouchable.js',
    'packages/shared/node_modules/react-native-gesture-handler/touchables/TouchableHighlight.js',
    'packages/shared/node_modules/react-native-gesture-handler/touchables/TouchableNativeFeedback.js',
    'packages/shared/node_modules/react-native-gesture-handler/gestureHandlerRootHOC.android.js',
    'packages/shared/node_modules/react-native-gesture-handler/Directions.js',
    'packages/shared/node_modules/react-native-gesture-handler/GestureHandlerButton.js',
    'packages/shared/node_modules/react-native-gesture-handler/GestureHandlerButton.web.js',
    'packages/shared/node_modules/react-native-gesture-handler/createHandler.web.js',
    'packages/shared/node_modules/react-native-gesture-handler/PlatformConstants.js',
  ]

  for (const path of todoImport) {
    const fileAsString = await readFile(path, 'utf-8')
    const patchedFile = fileAsString.replace("from 'react-native'", "from 'react-native2'")
    await writeFile(path, patchedFile)
  }

  const todoLibs = ['packages/shared/node_modules/react-native-screens/src/screens.native.js']

  for (const path of todoLibs) {
    const fileAsString = await readFile(path, 'utf-8')
    const patchedFile = fileAsString.replace(
      "from 'react-native/Libraries",
      "from 'react-native2/Libraries",
    )
    await writeFile(path, patchedFile)
  }
}

main()
