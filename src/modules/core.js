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
        description: '',
        color: '#ffffff',
        title: '',
        footer: ''
      }, opts);
      let embed = new Discord.RichEmbed();
      if (typeof opts.author == 'string') {
        embed.setAuthor(opts.author);
      }
      embed.setColor(this.core.config('embeds.' + opts.type + '.color', opts.color));
      embed.setDescription(Array.isArray(opts.message || opts.description) ? (opts.message || opts.description).join('\n') : (opts.message || opts.description));
      embed.setFooter(this.core.config('embeds.' + opts.type + '.footer', opts.footer));
      embed.setTitle(this.core.config('embeds.' + opts.type + '.title', opts.title));
      if (typeof opts.url == 'string') {
        embed.setURL(opts.url);
      }
      return embed;
    });
  }
  start() {
    /* Basic commands */
    this.core.registerCommand('help', {
      description: 'Lists the commands',
      usage: 'help <command>',
      run: (args, message, channel) => {
        channel.send(this.core.make('harobot/embed', {
          title: 'HaroBot Help',
          footer: `Running HaroBot version ${require('../../package.json').version}`,
          url: require('../../package.json').homepage,
          description: Object.keys(this.core.commands).map(commandName => {
            let cmd = this.core.commands[commandName];
            return [
              '* '+commandName+' - '+cmd.description
            ].join('\n');
          })
        }));
      }
    });
  }
}
module.exports = {CoreModule};

// vim:set ts=2 sw=2 et:
