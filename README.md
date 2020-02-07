![discot-logo](./.github/discot-logo.png)

[![Node CI](https://github.com/CorentinTh/discot/workflows/Node%20CI/badge.svg)](https://github.com/CorentinTh/discot/actions)

Create simple, yet powerful discord bots focusing on commands.

## What is it ?
**Discot** is a wrapper around [discord.js](https://discord.js.org/) to simplify the creation of server bots. It permists to focus on the creation of commands instead of spending time working with discord's API.

## Usage
### Installation
**Discot** can be installed using yarn or npm.

```shell
npm install discot
# or
yarn add discot
```
### Example
```javascript
const token = 'your_token';
const bot = new Bot({token});
```
Or, using environnment variable:
```javascript
const bot = new Bot({
    token: 'discord_token', // default value: process.env.DISCORD_TOKEN
    prefix: '!'             // default value: '!'
});

bot.addCommand({
        name: 'ping',
        description: 'Reply pong',
        action: message => message.channel.send('pong')
    })
    .addCommand({
        name: 'say',
        description: 'Send the text passed as first argument. Usage: "!say hello"',
        action: (message, args) => message.channel.send(args[0]),
        requiredArgCount: 0
    })
    .start(() => console.log('Bot started.'));
```

`message` in the `action` method for a command is the object from [discord.js](https://discord.js.org/#/docs/main/stable/class/Message) 

### API

## Contribute
**Pull requests are welcome !** Feel free to contribute.

## Credits
Coded with ❤️ by [Corentin Thomasset](//corentin-thomasset.fr).

## License
This project is under the [MIT license](./LICENSE).
