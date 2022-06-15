const Discord = require('discord.js');
const util = require('../../helpers/embed');

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  usage: 'help [command]',
  description: 'Shows all commands',
  execute: async (client, message, args) => {
    if (!args[0]) {
      const commands = client.commands.map(cmd => `\`${cmd.name}\``);
      return message.channel.send({
        embeds: [
          util.createMessageEmbed('Help', null, 'Here are all the commands you can use!', null, [
            { name: 'Commands', value: `${commands.join(', ')}`, inline: false }
          ])
        ]
      });
    }

    const command =
      client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
    if (!command)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | Command \`${args[0]}\` not found!`)]
      });

    return message.channel.send({
      embeds: [
        util.createMessageEmbed('Help', null, `${command.name}`, null, [
          { name: 'Description', value: command.description },
          { name: 'Usage', value: `${client.prefix}${command.usage}` },
          { name: 'Aliases', value: command.aliases ? command.aliases.join(', ') : 'None', inline: false }
        ])
      ]
    });
  }
};
