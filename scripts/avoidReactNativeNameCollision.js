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
  const todo = [
    {
      fileRelativePath:
        'packages/shared/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
      findString: "_interopDefault(require('react-native'))",
      replaceWith: "_interopDefault(require('react-native2'))",
    },
    {
      fileRelativePath: 'packages/shared/node_modules/react-navigation-stack/src/index.js',
      findString: "import { Platform } from 'react-native'",
      replaceWith: "import { Platform } from 'react-native2'",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/@react-navigation/native/src/createKeyboardAwareNavigator.js',
      findString: "import { TextInput } from 'react-native'",
      replaceWith: "import { TextInput } from 'react-native2'",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/@react-navigation/native/src/withOrientation.js',
      findString: "import { Dimensions } from 'react-native'",
      replaceWith: "import { Dimensions } from 'react-native2'",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/@react-navigation/native/src/ResourceSavingSceneView.js',
      findString: "import { Platform, StyleSheet, View } from 'react-native'",
      replaceWith: "import { Platform, StyleSheet, View } from 'react-native2'",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/@react-navigation/native/src/createAppContainer.js',
      findString: "import { AsyncStorage, Linking, Platform, BackHandler } from 'react-native'",
      replaceWith: "import { AsyncStorage, Linking, Platform, BackHandler } from 'react-native2'",
    },
    {
      fileRelativePath: 'packages/shared/node_modules/@react-navigation/native/src/Scrollables.js',
      findString:
        "import { ScrollView, Platform, FlatList, SectionList, RefreshControl } from 'react-native'",
      replaceWith:
        "import { ScrollView, Platform, FlatList, SectionList, RefreshControl } from 'react-native2'",
    },
    {
      fileRelativePath: 'packages/shared/node_modules/react-native-safe-area-view/index.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-tabs/src/navigators/createBottomTabNavigator.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-tabs/src/views/MaterialTopTabBar.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-tabs/src/navigators/createMaterialTopTabNavigator.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-stack/src/navigators/createStackNavigator.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-tabs/src/views/BottomTabBar.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-stack/src/views/Header/HeaderBackButton.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-stack/src/views/Header/HeaderTitle.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-stack/src/views/Header/HeaderStyleInterpolator.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
    {
      fileRelativePath:
        'packages/shared/node_modules/react-navigation-stack/src/views/StackView/StackViewCard.js',
      findString: "from 'react-native';",
      replaceWith: "from 'react-native2';",
    },
  ]

  for (const work of todo) {
    const { fileRelativePath, findString, replaceWith } = work
    const fileAsString = await readFile(fileRelativePath, 'utf-8')
    const patchedFile = fileAsString.replace(findString, replaceWith)
    await writeFile(fileRelativePath, patchedFile)
  }
}

main()
