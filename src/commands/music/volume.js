const util = require('../../helpers/embed');

module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    const volume = parseInt(args[0]);
    if (isNaN(volume))
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | Please enter a valid number!`)]
      });
    if (volume < 0 || volume <= 100) {
      queue.setVolume(volume);
      message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.success} | Volume set to \`${volume}\``)]
      });
    } else {
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | Please enter a number between 0 and 100!`)]
      });
    }
  }
};
