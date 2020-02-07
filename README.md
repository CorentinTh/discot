![discot-logo](./.github/discot-logo.png)

[![Node CI](https://github.com/CorentinTh/discot/workflows/Node%20CI/badge.svg)](https://github.com/CorentinTh/discot/actions)

Create simple, yet powerful discord bots focusing on commands.

## What is it ?
**Discot** is a wrapper around [discord.js](https://discord.js.org/) to simplify the creation of server bots. It permists to focus on the creation of commands instead of spending time working with discord's API.
<!--
## Create your bot
### 1. Discord token
First, you'll need a bot token. To do so, you'll need to create a discord application **[here](https://discordapp.com/developers/applications/)**. 
-->
## Usage
### Installation
**Discot** can be installed using yarn or npm.

```shell
npm install discot
# or
yarn add discot
```
### Example
#### Setting the token:
```javascript
const token = 'your_token';
const bot = new Bot({token});
```
Or, using environnment variable:
```javascript
process.env.DISCORD_TOKEN = 'your_token'; // prefer using 'dotenv', don't set your env inside the program

const bot = new Bot();
```

### API

## Contribute
**Pull requests are welcome !** Feel free to contribute.

## Credits
Coded with ❤️ by [Corentin Thomasset](//corentin-thomasset.fr).

## License
This project is under the [MIT license](./LICENSE).
