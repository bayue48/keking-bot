const util = require('../../helpers/embed');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  inVoiceChannel: true,
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} There is nothing playing right now!`)]
      });
    const autoplay = queue.toggleAutoplay();
    message.channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)]
    });
  }
};
