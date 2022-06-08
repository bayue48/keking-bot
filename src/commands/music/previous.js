const util = require('../../helpers/embed');

module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    const song = queue.previous();
    message.channel.send({ embeds: [util.createTextEmbed(`${client.emotes.success} | Now playing:\n${song.name}`)] });
  }
};
