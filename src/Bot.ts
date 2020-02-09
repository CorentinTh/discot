import {Client, ClientOptions, Message} from 'discord.js';
import {Command} from "./Command";
import {Parser} from "./Parser";

type DeepRequired<T> = {
    [P in keyof Required<T>]: T[P] extends object ? DeepRequired<T[P]> : NonNullable<Required<T[P]>>
}

type BotConfig = {
    token?: string;
    prefix?: string;
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
            action: this.sendHelpCommand.bind(this),
            requiredArgCount: 0
        });

        this.config = Object.assign({}, defaultConfig, config);
        this.on('message', this.handleMessage.bind(this));
    }

    private handleMessage(message: Message): boolean {
        if(this.user.id === message.author.id) return false;

        return this.commands.some(command => {
            const parser = new Parser(message.content);

            if (parser.getCommandName() === `${this.config.prefix}${command.name}`) {
                if (!command.requiredArgCount || parser.getArgsCount() >= command.requiredArgCount) {
                    command.action(message, parser.getArgs());
                } else {
                    Bot.replyToMessage(message, `Invalid arguments. The command "${command.name}" requires ${command.requiredArgCount} arguments.`);
                }
                return true;
            }
            return false;
        });
    }

    private sendHelpCommand(message: Message): void {
        const spacePaddingLength = 9;
        let helpMessage = '```';
        helpMessage += 'Available commands:\n\n';
        helpMessage += this.commands.map(command => {
            const name = command.name.startsWith(this.config.prefix) ? command.name : this.config.prefix + command.name;
            let str = '';
            str += `${name}`;
            str += `${' '.repeat(spacePaddingLength - name.length)}`;
            str += `${command.description ?? ''}`;
            str += command.usage ? `\n${' '.repeat(spacePaddingLength)}Usage: ${command.usage}` : '';
            return str;
        }).join('\n');
        helpMessage += '```';

        Bot.replyToMessage(message, helpMessage);
    }

    private static replyToMessage(message: Message, content: string): Promise<Message | Message[]> {
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