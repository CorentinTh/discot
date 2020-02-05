import {Client, ClientOptions, Message} from 'discord.js';
import {DeepRequired} from "./helpers";
import {Command} from "./Command";
import {Parser} from "./Parser";

type BotConfig = {
    token?: string,
}

export class Bot extends Client {
    config: DeepRequired<BotConfig>;
    commands: Command[] = [];

    constructor(config: BotConfig = defaultConfig, discordClientConfig: ClientOptions) {
        super(discordClientConfig);

        const defaultConfig: DeepRequired<BotConfig> = {
            token: process.env.DISCORD_TOKEN ?? ''
        };

        this.config = Object.assign({}, defaultConfig, config);

        this.on('message', this.handleMessage.bind(this))
    }

    private handleMessage(message: Message) {
        this.commands.some(command => {
            const parser = new Parser(message.content);

            if (parser.getCommandName() === command.name) {
                if (parser.getArgsCount() >= command.requiredArgCount - 1) {
                    command.action(message, parser.getArgs());
                    return true;
                }
                return true;
            }
            return false;
        });
    }

    addCommand(command: Command): Bot {
        this.commands.push(command);
        return this;
    }

    start(callback? : () => {}): Bot {
        if (callback) {
            this.on('ready', callback);
        }
        this.login(this.config.token).catch(e => {throw e});
        return this;
    }

}