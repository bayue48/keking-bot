const util = require('../../helpers/embed');

module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  usage: 'resume',
  description: 'Resume the current song',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    if (queue.paused === false) {
      message.channel.send({ embeds: [util.createTextEmbed('The queue has been playing already')] });
    } else {
      queue.resume();
      message.channel.send({ embeds: [util.createTextEmbed('Resumed the song for you :)')] });
    }
  }
};
