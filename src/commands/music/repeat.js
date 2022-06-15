const util = require('../../helpers/embed');

module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  inVoiceChannel: true,
  usage: 'repeat',
  description: 'Toggle repeat',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing playing!`)]
      });

    if (queue.repeatMode === 0) {
      queue.repeatMode = 1;
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.success} | Repeat mode set to \`This Song\``)]
      });
    } else if (queue.repeatMode === 1) {
      queue.repeatMode = 2;
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.success} | Repeat mode set to \`All Queue\``)]
      });
    } else if (queue.repeatMode === 2) {
      queue.repeatMode = 0;
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.success} | Repeat mode set to \`Off\``)]
      });
    }
  }
};
