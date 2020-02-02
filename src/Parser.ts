export class Parser {
    private readonly splitMessage: string[];

    constructor(message: string) {
        this.splitMessage = message.trim().split(/\s+/);
    }

    getCommandName(): string|undefined {
        return this.splitMessage[0].length > 0 ? this.splitMessage[0] : undefined;
    }

    getArgsCount(): number {
        return this.splitMessage.length - 1;
    }

    getArgs(): string[] {
        return this.splitMessage.slice(1);
    }

}

