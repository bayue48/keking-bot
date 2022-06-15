const util = require('../../helpers/embed');

module.exports = {
  name: 'ping',
  cooldown: 5,
  aliases: ['pong'],
  usage: 'ping',
  description: 'Ping!',
  execute: async (client, message) => {
    message.channel.send({
      embeds: [util.createTextEmbed(`Pong! ${client.ws.ping}ms`)]
    });
  }
};
