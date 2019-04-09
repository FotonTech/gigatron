<h1 align="center">
<br>
  <a href="https://github.com/FotonTech/gigatron"><img src="https://i.imgur.com/LVlSk6u.gif" alt="Gigatron" width=228"></a>
<br>
Gigatron
</h1>

<p align="center">The best boilerplate for your Monorepo Fullstack projects.</p>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square" alt="">
  </a>
</p>

<hr />

## Introduction

This boilerplate contains all you need to start your next monorepo Fullstack project.


## Getting started

1. Clone this repo using `https://github.com/FotonTech/gigatron.git`
2. Move to the appropriate directory: `cd gigatron`.<br />
3. Run `yarn` to install dependencies.<br />
4. Creat `.env` file in `./packages/server` with `MONGOOSE=mongo_url`<br />

## Commands

- `npm start` - start the app, server and web.

## Using React Native

- To add package foobar to app
```
cd packages/app
yarn add foobar
```

- If you add native dependencies that don't begin with `react-native-` add them to workspaces.nohoist in the root packages.json, with the globs below:

```json
// example with foobar package
// foobar doesn't match `react-native-` so we need to add manually to nohoist
// react-native-foobar would be fine though!
    "workspaces": {
        "nohoist": [
            "**/foobar",
            "**/foobar/**",
        ]
    },

```

## Next features:

- [ ] **Now serverless auto deployment**: Better HMR support;


## License

MIT license, Copyright (c) 2019 Foton.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/13947203?v=4" width="100px;"/><br /><sub><b>Jabur</b></sub>](https://github.com/jaburcodes)<br />[💬](#question-jaburcodes "Answering Questions") [🐛](https://github.com/FotonTech/gigatron/issues?q=author%3Ajaburcodes "Bug reports") [💻](https://github.com/FotonTech/gigatron/commits?author=jaburcodes "Code") [🤔](#ideas-jaburcodes "Ideas, Planning, & Feedback")  | [<img src="https://avatars1.githubusercontent.com/u/7690649?v=4" width="100px;"/><br /><sub><b>paulogdm</b></sub>](https://paulogdm.com)<br /> [💻](https://github.com/FotonTech/gigatron/commits?author=paulogdm "Code") [🚇](#infra-paulogdm "Infrastructure (Hosting, Build-Tools, etc)") [🛡️](#security-paulogdm "Security") [🔧](#tool-paulogdm "Tools") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
