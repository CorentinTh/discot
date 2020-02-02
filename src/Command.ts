import {Message} from "discord.js";

export interface Command {
    name: string,
    description: string,
    action: (message: Message, args: string[]) => boolean,
    requiredArgCount: number
}
