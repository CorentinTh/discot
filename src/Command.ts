import {Message} from "discord.js";

export interface Command {
    name: string;
    description?: string;
    usage?: string;
    action: (message: Message, args: string[]) => unknown;
    requiredArgCount?: number;
}
