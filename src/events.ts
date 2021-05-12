import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event: string, fn: (value: { message: string; description?: string }) => void) =>
    eventEmitter.on(event, fn),
  once: (event: any, fn: (value: { message: string; description?: string }) => void) =>
    eventEmitter.once(event, fn),
  off: (event: string) => eventEmitter.off(event),
  emit: (event: string, payload: { message: string; description?: string }) =>
    eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

export default Emitter;
