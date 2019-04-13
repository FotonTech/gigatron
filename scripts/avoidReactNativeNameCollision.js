#! /usr/bin/env node

const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const renameFile = util.promisify(fs.rename)

async function main() {
  const wd = process.cwd()
  if (!/gigatron$/.test(wd)) {
    throw new Error(`\npost install script ${process.argv[1]} should be run from monorepo root\n`)
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
