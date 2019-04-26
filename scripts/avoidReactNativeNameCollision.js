#! /usr/bin/env node

const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
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
    return console.warn('Already patched')
  }

  try {
    // we use hoisted react-native just to have nicer react-native link
    // but this will confuse metro bc it'll see two node_modules/react-native so
    // we rename shared/node_modules/react-native to shared/node_modules/react-native2 and
    // this fixes that. We also patch metro to look for react-native2 when it fails to resolve react-native under packages/shared.
    // This patch is in packages/app/patches
    await renameFile(
      'packages/shared/node_modules/react-native',
      'packages/shared/node_modules/react-native2',
    )
  } catch (error) {}
}

main()
