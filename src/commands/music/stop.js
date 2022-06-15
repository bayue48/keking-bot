const util = require('../../helpers/embed');

module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave', 'dc'],
  inVoiceChannel: true,
  usage: 'stop',
  description: 'Stop the music',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    queue.stop();
    message.channel.send({ embeds: [util.createTextEmbed(`${client.emotes.success} | Stopped!`)] });
  }
};
