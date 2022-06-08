const util = require('../../helpers/embed');

module.exports = {
  name: 'leave',
  execute: async (client, message) => {
    client.distube.voices.leave(message);
    return message.channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.success} | Left the voice channel!`)]
    });
  }
};
