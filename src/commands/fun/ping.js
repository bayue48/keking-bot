const util = require('../../helpers/embed');

module.exports = {
  name: 'ping',
  cooldown: 5,
  description: 'Ping!',
  execute: async (client, message) => {
    message.channel.send({
      embeds: [util.createTextEmbed(`Pong! ${client.ws.ping}ms`)]
    });
  }
};
