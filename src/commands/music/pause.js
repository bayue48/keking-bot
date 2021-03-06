const util = require('../../helpers/embed');

module.exports = {
  name: 'pause',
  aliases: ['hold'],
  inVoiceChannel: true,
  usage: 'pause',
  description: 'Pause the current song',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });

    if (queue.paused === false) {
      queue.pause();
      return message.channel.send({ embeds: [util.createTextEmbed(`${client.emotes.pause} | Paused the music!`)] });
    } else {
      queue.resume();
      return message.channel.send({ embeds: [util.createTextEmbed(`${client.emotes.success} | Resumed the music!`)] });
    }

  }
};
