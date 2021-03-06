const util = require('../../helpers/embed');

module.exports = {
  name: 'shuffle',
  aliases: ['sh'],
  inVoiceChannel: true,
  usage: 'shuffle',
  description: 'Shuffle the queue',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    queue.shuffle();
    message.channel.send({ embeds: [util.createTextEmbed('Shuffled songs in the queue')] });
  }
};
