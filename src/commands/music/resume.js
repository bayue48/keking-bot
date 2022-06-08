const util = require('../../helpers/embed');

module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    queue.resume();
    message.channel.send({ embeds: [util.createTextEmbed('Resumed the song for you :)')] });
  }
};
