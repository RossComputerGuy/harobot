const Discord = require('discord.js');
const {moduleHandler} = require('./utils.js');

const commands = Symbol('commands');
const createGraph = Symbol('createGraph');
const modules = Symbol('modules');

const runtimeMethods = {
  [commands]: new Map(),
  registerCommand: (name, opts={}) => new Promise((resolve, reject) => {
    if (this[commands].has(name)) {
      return reject(new Error(`Command ${name} already exists.`));
    }
    if (typeof opts != 'object') {
      return reject(new Error('opts is not an object.'));
    }
    if (Array.isArray(opts.description) && typeof opts.description != 'string') {
      return reject(new Error('opts is not an array or string.'));
    }
    if (typeof opts.run != 'function') {
      return reject(new Error('opts.run is not a function.'));
    }
    this[commands].set(name, opts);
    return resolve();
  })
};

class HaroBot {
  constructor(config) {
    this.config = config;
    this.client = new Discord.Client();
    this[modules] = moduleHandler(this);
    this.booted = false;
    this.started = false;
    this.destroyed = false;
  }
  
  instance(name, callback) {
    this[modules].bind(name, false, callback);
  }
  singleton(name, callback) {
    this[modules].bind(name, true, callback);
  }
  
  boot() {
    if (this.booted) {
      return Promise.resolve(true);
    }
    for (const methodName in runtimeMethods) {
      if (typeof runtimeMethods[methodName] === 'function') {
        runtimeMethods[methodName].bind(this);
      } else {
        this[methodName] = runtimeMethods[methodName];
      }
    }
    this.started = false;
    this.destroyed = false;
    this.booted = true;
    return this[modules].init(false).then(() => this.start());
  }
  
  destroy() {
    if (this.destroyed) {
      return false;
    }

    this.booted = false;
    this.destroyed = true;
    this.started = false;
    this[modules].destroy();

    return true;
  }
  
  start() {
    if (this.started) {
      return Promise.resolve(true);
    }
    this.started = true;
    return this[modules].init(false).then(() => true);
  }

  register(ref, options) {
    return this[modules].register(ref, options);
  }

  make(name, ...args) {
    return this[modules].make(name, ...args);
  }
  has(name) {
    return this[modules].has(name);
  }
}
module.exports = HaroBot;

// vim:set ts=2 sw=2 et:
