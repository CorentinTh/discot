import {Client, ClientOptions, Message} from 'discord.js';
import {DeepRequired} from "./helpers";
import {Command} from "./Command";
import {Parser} from "./Parser";

type BotConfig = {
    token?: string,
    prefix?: string
}

export class Bot extends Client {
    config: DeepRequired<BotConfig>;
    commands: Command[] = [];

    constructor(config?: BotConfig, discordClientConfig?: ClientOptions) {
        super(discordClientConfig);

        const defaultConfig: DeepRequired<BotConfig> = {
            token: process.env.DISCORD_TOKEN ?? '',
            prefix: '!'
        };

        this.addCommand({
            name: 'help',
            description: 'Print this help message',
            action: this.helpCommand.bind(this),
            requiredArgCount:0
        });

        this.config = Object.assign({}, defaultConfig, config);
        this.on('message', this.handleMessage.bind(this));
    }

    private handleMessage(message: Message) {
        this.commands.some(command => {
            const parser = new Parser(message.content);

            if (parser.getCommandName() === `${this.config.prefix}${command.name}`) {
                if (!command.requiredArgCount || parser.getArgsCount() >= command.requiredArgCount) {
                    command.action(message, parser.getArgs());
                }else {
                    this.replyToMessage(message, `Invalid arguments. The command "${command.name}" requires ${command.requiredArgCount} arguments.`);
                }
                return true;
            }
            return false;
        });
    }

    helpCommand(message: Message) {
        const spacePaddingLength = 14;
        let helpMessage = 'Available commands:\n\n';
        helpMessage += this.commands.map(command => `${this.config.prefix}${command.name}${' '.repeat(spacePaddingLength - command.name.length)}${command.description}`).join('\n');
        message.channel.send(helpMessage);
    }

    replyToMessage(message: Message, content: string): Promise<any> {
        return message.channel.send(content)
    }

    addCommand(command: Command): Bot {
        this.commands.push(command);
        return this;
    }

    start(callback?: () => void): Promise<string> {
        if (callback) {
            this.on('ready', callback);
        }

        return this.login(this.config.token);
    }

}