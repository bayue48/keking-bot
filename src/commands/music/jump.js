const util = require('../../helpers/embed');

module.exports = {
  name: 'jump',
  aliases: ['j'],
  inVoiceChannel: true,
  usage: 'jump <number>',
  description: 'Jump to song from playlist.',
  execute: async (client, message, args) => {
    let queue = client.distube.getQueue(message);
    if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
      message.channel.send(util.createTextEmbed(`Jumped to ${Number(args[0])} song!`));
      return client.distube.jump(message, parseInt(args[0])).catch(err =>
        message.channel.send(err, {
          embeds: [util.createTextEmbed(`${client.emotes.error} | Invalid song number.`)]
        })
      );
    } else if (!queue) {
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing playing!`)]
      });
    } else {
      message.channel.send({
        embeds: [
          util.createTextEmbed(
            `${client.emotes.error} | Invalid song number. Please use a number between **1** and **${
              queue.songs.length - 1
            }**`
          )
        ]
      });
    }
  }
};
