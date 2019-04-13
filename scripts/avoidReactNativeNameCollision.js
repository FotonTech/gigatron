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
    return console.warn('Already patched')
  }

  await renameFile(
    'packages/shared/node_modules/react-native',
    'packages/shared/node_modules/react-native2',
  )
  const todo = [
    {
      fileRelativePath:
        'packages/shared/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
      findString: "_interopDefault(require('react-native'))",
      replaceWith: "_interopDefault(require('react-native2'))",
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
