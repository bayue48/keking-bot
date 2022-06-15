const util = require('../../helpers/embed');

module.exports = {
  name: 'queue',
  aliases: ['q'],
  inVoiceChannel: true,
  usage: 'queue',
  description: 'Show the queue',
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing playing!`)]
      });

    const q = util.createQueueEmbed(queue.songs);
    q.forEach((e, i) => {
      e.footer = {
        text: `Page ${i + 1}/${q.length} | ${queue.songs.length} songs`
      };
    });

    message.channel.send({
      embeds: [q[0]]
    });
  }
};
