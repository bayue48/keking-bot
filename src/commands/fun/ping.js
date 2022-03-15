const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  name: 'ping',
  cooldown: 5,
  description: 'Ping!',
  execute: async (client, message) => {
    message.channel.send(`Pong! ${client.ws.ping}ms`);
  }
};
