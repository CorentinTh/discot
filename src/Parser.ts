export class Parser {
    private readonly splitMessage: string[] = [];

    constructor(message: string) {
        message
            .trim()
            .match(/"[^"]+"|[\S]+/g)
            ?.forEach(element => {
                if (element) {
                    this.splitMessage.push(element.replace(/"/g, ''));
                }
            });
    }

    getCommandName(): string | undefined {
        return this.splitMessage.length > 0 ? this.splitMessage[0] : undefined;
    }

    getArgsCount(): number {
        return this.splitMessage.length > 0 ? this.splitMessage.length - 1 : 0;
    }

    getArgs(): string[] {
        return this.splitMessage.slice(1);
    }

}
