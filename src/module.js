class Module {
  constructor(bot, options={}) {
    this.bot = bot;
    this.options = options;
  }
  get metadata() {
    throw new Error('Metadata not defined.');
  }
  init() {
    return Promise.reject(new Error('init(): not implemented'));
  }
  start() {
    return Promise.reject(new Error('start(): not implemented'));
  }
  destroy() {
    return Promise.reject(new Error('destroy(): not implemented'));
  }
}
module.exports = Module;

// vim:set ts=2 sw=2 et:
