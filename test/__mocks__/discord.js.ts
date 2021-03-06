import {EventEmitter} from "events";

class Client extends EventEmitter {
    login = jest.fn((token?: string) => token === 'error' ? Promise.reject('') : Promise.resolve(''));
    user = {id: 'bot-id'}
}

export {Client}