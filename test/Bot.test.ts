import {Bot} from "../src";
import {mocked} from 'ts-jest/utils'
import fn = jest.fn;

jest.mock('discord.js');
// mocked(Bot.prototype.login).mockImplementation((token?: string) => Promise.resolve(''));

beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.DISCORD_TOKEN;
});

it('should trigger login with token when started', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token});

    bot.start();

    expect(bot.login).toHaveBeenCalled();
    expect(bot.login).toHaveBeenCalledWith(token);
});

it('should use env.DISCORD_TOKEN by default when available ', () => {
    process.env.DISCORD_TOKEN = 'mlkjhgfdsqqsdfghjklm';
    const bot = new Bot();

    bot.start();

    expect(bot.login).toHaveBeenCalled();
    expect(bot.login).toHaveBeenCalledWith(process.env.DISCORD_TOKEN);
});

it('should trigger callback when started', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token});
    const cb = jest.fn();

    bot.start(cb);
    bot.emit('ready');

    expect(cb).toHaveBeenCalled();
});

it('should trigger command', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token});
    const action = jest.fn();

    bot.addCommand({
        action,
        name: 'ping',
        description: '',
        requiredArgCount:0
    }).start();

    bot.emit('message', {content: '!ping'});
    expect(action).toHaveBeenCalled();
});


it('should trigger command with different prefix', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token, prefix:'-'});
    const action = jest.fn();

    bot.addCommand({
        action,
        name: 'ping',
        description: '',
        requiredArgCount:0
    }).start();

    bot.emit('message', {content: '-ping'});
    expect(action).toHaveBeenCalled();
});

it('should not trigger command with incorrect command name', () => {
    const bot = new Bot();
    const action = jest.fn();

    bot.addCommand({
        action,
        name: 'ping',
        description: '',
        requiredArgCount:0
    }).start();

    bot.emit('message', {content: 'notping'});
    expect(action).not.toHaveBeenCalled();
});

it('should not trigger command with incorrect arg count', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token});
    const action = jest.fn();

    bot.addCommand({
        action,
        name: 'ping',
        description: '',
        requiredArgCount:1
    }).start();

    bot.emit('message', {content: 'ping'});
    expect(action).not.toHaveBeenCalled();
});

it('should not trigger command with incorrect arg count and respond with a fail message', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token});
    const action = jest.fn();

    bot.addCommand({
        action,
        name: 'ping',
        description: '',
        requiredArgCount:1
    }).start();

    const message = {content: '!ping', channel: {send: jest.fn()}};
    bot.emit('message', message);
    expect(action).not.toHaveBeenCalled();
    expect(message.channel.send).toHaveBeenCalledWith(`Invalid arguments. The command "ping" requires 1 arguments.`);
});

it('should send help message for help command', () => {
    const token = 'azertyuioppoiuytreza';
    const bot = new Bot({token});
    const action = jest.fn();

    bot.addCommand({
        action,
        name: 'ping',
        description: 'The ping command',
        requiredArgCount:1
    }).start();

    const message = {content: '!help', channel: {send: jest.fn()}};
    bot.emit('message', message);
    expect(action).not.toHaveBeenCalled();
    expect(message.channel.send).toHaveBeenCalledWith('```' +
        'Available commands:\n\n' +
        '!help     Print this help message\n' +
        '!ping     The ping command' +
        '```');
});

