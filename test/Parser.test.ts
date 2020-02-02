import {Parser} from '../src/Parser'

it('should get command name', () => {
    const parser = new Parser('ping');

    expect(parser.getCommandName()).toBe('ping');
});

it('should get args count', () => {
    const parser = new Parser('ping a1 a2');

    expect(parser.getArgsCount()).toBe(2);
});

it('should get args', () => {
    const parser = new Parser('ping a1 a2');

    expect(parser.getArgs()).toEqual(['a1', 'a2']);
    expect(parser.getArgs()).not.toEqual(['a2', 'a1']);
    expect(parser.getArgs()).not.toEqual([]);
});

it('should handle empty command', () => {
    const parser = new Parser('');

    expect(parser.getArgs()).toHaveLength(0);
    expect(parser.getArgs()).toEqual([]);
    expect(parser.getArgsCount()).toBe(0);
    expect(parser.getCommandName()).toBe(undefined);
});