const config = require('../../config.json');
const HaroBot = require('../');

const bot = new HaroBot(config);

// TODO: register modules

bot.boot();

// vim:set ts=2 sw=2 et:
