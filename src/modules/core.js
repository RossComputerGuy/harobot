const Discord = require('discord.js');
const Module = require('../module.js');

class CoreModule extends Module {
  constructor(core, options) {
    super(core, options);
  }
  metadata() {
    return {
      name: 'HaroBot Core',
      desc: 'Core module that provides basic functionality to the HaroBot.',
      author: 'Spaceboy Ross',
      ver: '0.1.0',
      url: 'https://github.com/SpaceboyRoss01/harobot',
      provides: [
        'harobot/embed'
      ]
    };
  }
  async init() {
    /* For rich embeds */
    this.core.instance('harobot/embed', (opts) => {
      opts = Object.assign({
        type: 'default',
        message: '',
        color: '#ffffff',
        title: '',
        footer: ''
      }, opts);
      let embed = new Discord.RichEmbed();
      if (typeof opts.author == 'string') {
        embed.setAuthor(opts.author);
      }
      embed.setColor(this.core.config('embeds.' + opts.type + '.color', opts.color));
      embed.setDescription(opts.message || opts.description);
      embed.setFooter(this.core.config('embeds.' + opts.type + '.footer', opts.footer));
      embed.setTitle(this.core.config('embeds.' + opts.type + '.title', opts.title));
      return embed;
    });
  }
}
module.exports = {CoreModule};

// vim:set ts=2 sw=2 et:
