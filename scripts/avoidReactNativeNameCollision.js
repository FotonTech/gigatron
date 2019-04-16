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
    'packages/shared/node_modules/@react-navigation/native/src/createKeyboardAwareNavigator.js',
    'packages/shared/node_modules/@react-navigation/native/src/withOrientation.js',
    'packages/shared/node_modules/@react-navigation/native/src/ResourceSavingSceneView.js',
    'packages/shared/node_modules/@react-navigation/native/src/createAppContainer.js',
    'packages/shared/node_modules/@react-navigation/native/src/Scrollables.js',
    'packages/shared/node_modules/react-native-safe-area-view/index.js',
    'packages/shared/node_modules/react-navigation-tabs/src/navigators/createBottomTabNavigator.js',
    'packages/shared/node_modules/react-navigation-tabs/src/views/MaterialTopTabBar.js',
    'packages/shared/node_modules/react-navigation-tabs/src/navigators/createMaterialTopTabNavigator.js',
    'packages/shared/node_modules/react-navigation-stack/src/navigators/createStackNavigator.js',
    'packages/shared/node_modules/react-navigation-tabs/src/views/BottomTabBar.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/Header/HeaderBackButton.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/Header/HeaderTitle.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/Header/HeaderStyleInterpolator.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/StackView/StackViewCard.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/Header/Header.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/StackView/StackViewLayout.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/StackView/StackViewStyleInterpolator.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/Transitioner.js',
    'packages/shared/node_modules/react-navigation-drawer/dist/navigators/createDrawerNavigator.js',
    'packages/shared/node_modules/react-navigation-drawer/dist/views/DrawerNavigatorItems.js',
    'packages/shared/node_modules/react-navigation-drawer/dist/views/DrawerSidebar.js',
    'packages/shared/node_modules/react-navigation-drawer/dist/views/DrawerView.js',
    'packages/shared/node_modules/react-native-safe-area-view/withOrientation.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/Header/ModularHeaderBackButton.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/TouchableItem.js',
    'packages/shared/node_modules/react-native-screens/src/screens.native.js',
    'packages/shared/node_modules/react-navigation-stack/src/utils/ReactNativeFeatures.js',
    'packages/shared/node_modules/react-navigation-drawer/dist/views/TouchableItem.js',
    'packages/shared/node_modules/react-navigation-tabs/src/views/ResourceSavingScene.js',
    'packages/shared/node_modules/react-navigation-tabs/src/views/CrossFadeIcon.js',
    'packages/shared/node_modules/react-navigation-tabs/src/utils/withDimensions.js',
    'packages/shared/node_modules/react-native-gesture-handler/DrawerLayout.js',
    'packages/shared/node_modules/react-navigation-drawer/dist/views/ResourceSavingScene.js',
    'packages/shared/node_modules/react-native-gesture-handler/Swipeable.js',
    'packages/shared/node_modules/react-native-gesture-handler/GestureHandler.js',
    'packages/shared/node_modules/react-navigation-stack/src/views/StackView/StackViewTransitionConfigs.js',
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
