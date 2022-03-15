module.exports = {
  name: 'ping',
  cooldown: 5,
  description: 'Ping!',
  execute: async (client, message) => {
    message.channel.send(`Pong! ${client.ws.ping}ms`);
  }
};
