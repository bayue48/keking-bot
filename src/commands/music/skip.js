const util = require('../../helpers/embed');

module.exports = {
  name: 'skip',
  aliases: ['s', 'next', 'n'],
  inVoiceChannel: true,
  usage: 'skip',
  description: 'Skip current song',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    try {
      const song = await queue.skip();
      message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)]
      });
    } catch (e) {
      message.channel.send({ embeds: [util.createTextEmbed(`${client.emotes.error} | ${e}`)] });
    }
  }
};
