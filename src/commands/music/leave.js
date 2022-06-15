const util = require('../../helpers/embed');

module.exports = {
  name: 'leave',
  aliases: ['l'],
  inVoiceChannel: true,
  usage: 'leave',
  description: 'Leave bot from voice channel',
  execute: async (client, message) => {
    client.distube.voices.leave(message);
    return message.channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.success} | Left the voice channel!`)]
    });
  }
};
