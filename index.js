const config = require('./config.json');
const Core = require('slimcord.js');

/* Module imports */
const {CoreModule} = require('./modules/core.js');

/* Creation of the bot */
const bot = new Core(config);

bot.register(CoreModule, { before: true });

module.exports = bot;

// vim:set ts=2 sw=2 et:
